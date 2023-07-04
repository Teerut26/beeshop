import { NextPage } from "next";
import styled from "@emotion/styled";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";
import EditProductModal from "../EditProductModal";
import { ProductInterface } from "@/interfaces/ProductInterface";
import useFirestore from "@/hooks/useFirestore";
import { StoreInterface } from "@/interfaces/StoreInterface";
interface Props {
  canEdit?: boolean;
  product: ProductInterface;
  store: StoreInterface;
}

const ProductCardStyle = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  overflow: hidden;
  width: 15rem;
  position: relative;
  z-index: 0;
`;

const ProductComponent: NextPage<Props> = ({ canEdit, product, store }) => {
  const { onDeleteProduct } = useFirestore();

  const onDelete = () => {
    Swal.fire({
      title: "ลบสินค้าหรือไม่",
      text: "คุณต้องการลบสินค้าหรือไม่?",
      icon: "warning",
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: "ลบ",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isDenied) {
        onDeleteProduct(product.id!);
      }
    });
  };

  return (
    <ProductCardStyle>
      {canEdit && (
        <div className="absolute right-1 top-1">
          <div className="flex gap-1">
            <button onClick={onDelete} className="badge bg-red-500 hover:bg-red-600">
              <Icon icon="material-symbols:delete-outline" className="text-white" />
            </button>
            <EditProductModal product={product} />
          </div>
        </div>
      )}

      <img src={product.image} alt="" className="h-3/4 w-full object-cover" />
      <div className="flex flex-col p-3">
        <div className="flex justify-between gap-3">
          <div className="truncate">{product.name}</div>
          <div className="text-xl font-bold">{product.price}฿</div>
        </div>
        <div>
          <div className="flex items-center gap-1 truncate text-sm font-light text-gray-500">
            <Icon icon="material-symbols:storefront-outline" /> {store.name}
          </div>
        </div>
        {!canEdit && (
          <>
            <div className="mt-3">
              <button className="btn-sm btn bg-blue-500 text-white hover:bg-blue-600">เพิ่มลงตะกร้า</button>
            </div>
          </>
        )}
      </div>
    </ProductCardStyle>
  );
};

export default ProductComponent;
