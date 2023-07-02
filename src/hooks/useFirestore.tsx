import { app, db } from "@/configs/firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider, User, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useFirestore() {
  const [user, setUser] = useState<User | null>();
  const [HasStore, setHasStore] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const auth = getAuth(app);
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const storeSnap = await getDoc(doc(db, "store", user?.uid!));
      console.log(storeSnap.exists());
      
      console.log(storeSnap.exists());
      if (storeSnap.exists()) {
        setHasStore(true);
      } else {
        setHasStore(false);
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

  return { signInWithGoogle, user, signOutAction, HasStore };
}
