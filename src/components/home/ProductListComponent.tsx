import { NextPage } from "next";
import ProductComponent from "./ProductComponent";

interface Props {
  canEdit?: boolean;
}

const ProductListComponent: NextPage<Props> = ({ canEdit }) => {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {[...new Array(19)].map((_, index) => (
        <ProductComponent key={index} canEdit={canEdit} />
      ))}
    </div>
  );
};

export default ProductListComponent;
