import AddProductModal from "@/components/AddProductModal";
import ProductListComponent from "@/components/home/ProductListComponent";
import CheckSession from "@/layouts/CheckSession";
import NavbarLayouts from "@/layouts/NavbarLayouts";
import { Input } from "antd";
import { NextPage } from "next";

interface Props {}

const StoreManagement: NextPage<Props> = () => {
  return (
    <CheckSession>
      <NavbarLayouts>
        <div className="flex flex-col gap-5 p-5">
          <div className="flex justify-end gap-3">
            <Input placeholder="ค้นหาสินค้า" />
            <AddProductModal />
          </div>
          <ProductListComponent canEdit={true} />
        </div>
      </NavbarLayouts>
    </CheckSession>
  );
};

export default StoreManagement;
