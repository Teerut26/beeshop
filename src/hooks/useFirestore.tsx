import { app, db } from "@/configs/firebase";
import { StoreInterface } from "@/interfaces/StoreInterface";
import { getAuth, signInWithPopup, GoogleAuthProvider, User, signOut } from "firebase/auth";
import { doc, getDoc, onSnapshot, query, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function useFirestore() {
  const [user, setUser] = useState<User | null>();
  const [HasStore, setHasStore] = useState<boolean | undefined>(undefined);
  const [MyStore, setMyStore] = useState<StoreInterface | undefined>();

  useEffect(() => {
    const auth = getAuth(app);
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    const unsubscribe = onSnapshot(doc(db, "store", `${user?.uid}`), (querySnapshot) => {
      console.log("Current cities in CA: ", querySnapshot.data());
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

        return toast.success("บันทึกข้อมูลสำเร็จ")
      }

      await setDoc(doc(db, "store", user?.uid!), {
        available: true,
        foods: [],
        name,
        description,
        id: user?.uid!,
      } as StoreInterface);
    } catch (error) {
      console.log(error);
    }
  };

  return { signInWithGoogle, user, signOutAction, HasStore, MyStore, onSaveStoreDetail };
}


