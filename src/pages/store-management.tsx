import AddProductModal from "@/components/AddProductModal";
import ProductListComponent from "@/components/home/ProductListComponent";
import useFirestore from "@/hooks/useFirestore";
import CheckSession from "@/layouts/CheckSession";
import NavbarLayouts from "@/layouts/NavbarLayouts";
import { Input } from "antd";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect } from "react";

interface Props {}

const StoreManagement: NextPage<Props> = () => {
  const { MyStore } = useFirestore();

  return (
    <CheckSession>
      <NavbarLayouts>
        <div className="flex flex-col gap-5 p-5">
          {MyStore ? (
            <>
              <div className="flex justify-end gap-3">
                <Input placeholder="ค้นหาสินค้า" />
                <AddProductModal />
              </div>
              {MyStore?.products && <ProductListComponent canEdit={true} store={MyStore} />}
            </>
          ) : (
            <div className="flex flex-col gap-3">
              <div>คุณยังไม่ได้สร้างร้านค้า</div>
              <Link href="/my-store" className="btn text-white btn-sm w-fit bg-yellow-500">สร้างร้านค้า</Link>
            </div>
          )}
        </div>
      </NavbarLayouts>
    </CheckSession>
  );
};

export default StoreManagement;
