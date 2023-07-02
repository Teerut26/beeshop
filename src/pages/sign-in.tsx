import useFirestore from "@/hooks/useFirestore";
import { Icon } from "@iconify/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface Props {}

const SignIn: NextPage<Props> = () => {
  const { signInWithGoogle, user } = useFirestore();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col gap-5">
        <div className="flex cursor-pointer flex-col items-center justify-center gap-0 text-2xl font-bold md:flex-row md:gap-2">
          <Icon icon="ic:round-fastfood" className="text-6xl md:text-2xl" /> Bee Shop
        </div>
        <button
          onClick={signInWithGoogle}
          className="btn rounded bg-yellow-400 hover:bg-yellow-500"
        >
          Sign In with Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;
