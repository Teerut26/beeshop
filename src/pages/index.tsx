import { api } from "@/utils/api";
import NavbarLayouts from "@/layouts/NavbarLayouts";
import ProductListComponent from "@/components/home/ProductListComponent";
import { Icon } from "@iconify/react";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <NavbarLayouts>
      <div className="sticky top-0 flex gap-3 border-t bg-yellow-500 px-5 py-2 ">
        <input
          type="text"
          className="w-full rounded px-2 py-1 focus:outline-none"
          placeholder="ค้นหาร้าน / เมนู"
        />
        <button className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600">
          <Icon icon="ic:baseline-shopping-cart" className="text-xl" />
        </button>
      </div>
      <div className="flex justify-center p-5">
        <ProductListComponent />
      </div>
    </NavbarLayouts>
  );
}
