import { app, db } from "@/configs/firebase";
import { StoreInterface } from "@/interfaces/StoreInterface";
import { getAuth, signInWithPopup, GoogleAuthProvider, User, signOut } from "firebase/auth";
import { collection, doc, getDoc, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { deleteObject, getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { ProductInterface } from "@/interfaces/ProductInterface";

export default function useFirestore() {
  const [user, setUser] = useState<User | null>();
  const [HasStore, setHasStore] = useState<boolean | undefined>(undefined);
  const [MyStore, setMyStore] = useState<StoreInterface | undefined>();
  const [StoreAll, setStoreAll] = useState<StoreInterface[]>([]);

  useEffect(() => {
    const auth = getAuth(app);
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    const unsubscribe = onSnapshot(doc(db, "store", `${user?.uid}`), (querySnapshot) => {
      if (querySnapshot.exists()) {
        setHasStore(true);
        setMyStore(querySnapshot.data() as StoreInterface);
      } else {
        setHasStore(false);
        setMyStore(undefined);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const storeSnap = await getDoc(doc(db, "store", user?.uid!));

      if (storeSnap.exists()) {
        setHasStore(true);
        setMyStore(storeSnap.data() as StoreInterface);
      } else {
        setHasStore(false);
        setMyStore(undefined);
      }
    })();
  }, [user]);

  useEffect(() => {
    const q = query(collection(db, "store"), where("available", "==", true));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const stores: StoreInterface[] = [];
      querySnapshot.forEach((doc) => {
        stores.push(doc.data() as StoreInterface);
      });
      setStoreAll(stores);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    const auth = getAuth(app);
    auth.languageCode = "th";
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  const signOutAction = () => {
    const auth = getAuth(app);
    signOut(auth);
  };

  const onSaveStoreDetail = async (name: string, description?: string) => {
    if (!user) return;
    try {
      const storeSnap = await getDoc(doc(db, "store", user?.uid!));
      if (storeSnap.exists()) {
        await updateDoc(doc(db, "store", user?.uid!), {
          name,
          description,
        });

        return toast.success("บันทึกข้อมูลสำเร็จ");
      }

      await setDoc(doc(db, "store", user?.uid!), {
        available: true,
        products: [],
        name,
        description,
        id: user?.uid!,
      } as StoreInterface);
    } catch (error) {
      console.log(error);
    }
  };

  const onAddProduct = async (name: string, price: number, description?: string, image?: string) => {
    if (!user) return;
    try {
      const productId = uuidv4();
      const storage = getStorage(app);
      const storageRef = ref(storage, "/store/" + productId + ".jpg");

      if (image) {
        await uploadString(storageRef, image, "data_url");
      }

      const storeSnap = await getDoc(doc(db, "store", user?.uid!));

      if (storeSnap.exists()) {
        const imageUrl = image ? await getDownloadURL(storageRef) : "";

        const updatedProducts = [
          ...(storeSnap.data()?.products || []),
          {
            id: productId,
            name,
            price,
            description,
            image: imageUrl,
          },
        ];

        await updateDoc(doc(db, "store", user?.uid!), {
          products: updatedProducts,
        });

        return Swal.fire("เพิ่มสินค้าสำเร็จ", "", "success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onEditProduct = async (productId: string, name: string, price?: number, description?: string, image?: string) => {
    if (!user) return;

    try {
      const storage = getStorage(app);

      const storageRef = ref(storage, "/store/" + productId + ".jpg");

      if (image) {
        await uploadString(storageRef, image, "data_url");
      }

      const storeSnap = await getDoc(doc(db, "store", user?.uid!));
      if (storeSnap.exists()) {
        const imageUrl = image ? await getDownloadURL(storageRef) : "";

        const oldData = storeSnap.data()?.products.find((product: any) => product.id === productId) as ProductInterface;

        await updateDoc(doc(db, "store", user?.uid!), {
          products: storeSnap.data()?.products.map((product: any) => {
            if (product.id === productId) {
              return {
                name: name ? name : oldData.name,
                price: price ? price : oldData.price,
                description: description && description?.length >= 0 ? description : oldData.description,
                image: image ? imageUrl : oldData.image,
                id: productId ? productId : oldData.id,
              };
            }
            return product;
          }),
        });

        return Swal.fire("แก้ไขสำเร็จ", "", "success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteProduct = async (id: string) => {
    if (!user) return;
    try {
      const storeSnap = await getDoc(doc(db, "store", user?.uid!));

      const storage = getStorage(app);
      const storageRef = ref(storage, "/store/" + id + ".jpg");
      await deleteObject(storageRef);

      if (storeSnap.exists()) {
        await updateDoc(doc(db, "store", user?.uid!), {
          products: storeSnap.data()?.products.filter((product: any) => product.id !== id),
        });

        return Swal.fire("ลบสำเร็จ", "", "success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    signInWithGoogle,
    user,
    signOutAction,
    HasStore,
    MyStore,
    onSaveStoreDetail,
    onAddProduct,
    onEditProduct,
    onDeleteProduct,
    StoreAll,
  };
}
