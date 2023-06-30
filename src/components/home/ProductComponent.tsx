import { NextPage } from "next";
import styled from "@emotion/styled";
import { Icon } from "@iconify/react";

interface Props {}

const ProductCardStyle = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  overflow: hidden;
  height: 17rem;
  width: 15rem;
`;

const ProductComponent: NextPage<Props> = () => {
  return (
    <ProductCardStyle>
      <img
        src="https://images.aws.nestle.recipes/resized/16d4cde420f2a4f544df6549e8aea4c3_egg-fired-rice_944_531.jpeg"
        alt=""
        className="h-3/4 w-full object-cover"
      />
      <div className="flex flex-col p-3">
        <div className="flex justify-between gap-3">
          <div className="truncate">ข้าวผัด</div>
          <div className="text-xl font-bold">50฿</div>
        </div>
        <div>
          <div className="flex items-center gap-1 truncate text-sm font-light text-gray-500">
            <Icon icon="material-symbols:storefront-outline" /> หมิงหมิงตามสั่ง
          </div>
        </div>
        <div className="mt-3">
          <button className="btn bg-blue-500 text-white hover:bg-blue-600">
            เพิ่มลงตะกร้า
          </button>
        </div>
      </div>
    </ProductCardStyle>
  );
};

export default ProductComponent;
