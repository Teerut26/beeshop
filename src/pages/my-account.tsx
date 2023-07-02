import BtnBack from "@/components/BtnBack";
import useFirestore from "@/hooks/useFirestore";
import CheckSession from "@/layouts/CheckSession";
import NavbarLayouts from "@/layouts/NavbarLayouts";
import { Icon } from "@iconify/react";
import { NextPage } from "next";

interface Props {}

const MyAccount: NextPage<Props> = () => {
  const { HasStore, user, signOutAction } = useFirestore();
  return (
    <CheckSession>
      <NavbarLayouts>
        <div className="flex flex-col justify-center gap-3 p-5">
          <BtnBack />
          <div className="flex gap-3">
            {user?.photoURL && <img src={user?.photoURL} />}
            <div className="flex flex-col">
              <div className="flex gap-2">
                <div>Name :</div>
                <div>{user?.displayName}</div>
              </div>
              <div className="flex gap-2">
                <div>Email :</div>
                <div>{user?.email}</div>
              </div>
            </div>
          </div>
        </div>
      </NavbarLayouts>
    </CheckSession>
  );
};

export default MyAccount;
