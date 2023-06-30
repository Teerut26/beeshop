import { NextPage } from "next";
import ProductComponent from "./ProductComponent";

interface Props {}

const ProductListComponent: NextPage<Props> = () => {
  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {[...new Array(19)].map((_, index) => (
        <ProductComponent key={index} />
      ))}
    </div>
  );
};

export default ProductListComponent;
