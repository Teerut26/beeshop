import "firebase/firestore";
import { FirebaseOptions, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { env } from "@/env.mjs";

const firebaseConfig = JSON.parse(env.NEXT_PUBLIC_FIREBASE_CONFIG) as FirebaseOptions

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, app };
