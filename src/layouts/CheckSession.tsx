import { app } from "@/configs/firebase";
import { getAuth } from "firebase/auth";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

const CheckSession: NextPage<Props> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(app);
    auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/sign-in");
      }
    });
  }, []);
  return <>{children}</>;
};

export default CheckSession;
