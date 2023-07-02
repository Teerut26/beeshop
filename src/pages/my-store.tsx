import CheckSession from "@/layouts/CheckSession";
import NavbarLayouts from "@/layouts/NavbarLayouts";
import { NextPage } from "next";

interface Props {}

const MyStore: NextPage<Props> = () => {
  return (
    <CheckSession>
      <NavbarLayouts>
        <div className="p-5">
            f
        </div>
      </NavbarLayouts>
    </CheckSession>
  );
};

export default MyStore;
