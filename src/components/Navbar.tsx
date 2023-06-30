import useFirestore from "@/hooks/useFirestore";
import { NextPage } from "next";
import { Icon } from "@iconify/react";

interface Props {}

const Navbar: NextPage<Props> = () => {
  //   const { signOutAction, user } = useFirestore();
  return (
    <div className="flex flex-col">
      <div className="flex justify-between bg-yellow-500 px-5 py-2">
        <div className="text-2xl font-bold text-white flex items-center gap-2"> <Icon icon="ic:round-fastfood" className="text-2xl hidden md:block" /> Bee Shop</div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center gap-1 text-white">
            <div>teerutsr@gmail.com</div>
            <Icon icon="ic:baseline-account-circle" className="text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
