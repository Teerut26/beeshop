import { NextPage } from "next";
import ProductComponent from "./ProductComponent";
import { ProductInterface } from "@/interfaces/ProductInterface";
import { StoreInterface } from "@/interfaces/StoreInterface";

interface Props {
  canEdit?: boolean;
  store: StoreInterface;
}

const ProductListComponent: NextPage<Props> = ({ canEdit, store }) => {

    console.log(store);
    
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {store.products.map((product, index) => (
        <ProductComponent key={index} canEdit={canEdit} product={product} store={store} />
      ))}
    </div>
  );
};

export default ProductListComponent;
