import { ProductInterface } from "./ProductInterface";

export interface StoreInterface {
  id?: string;
  name: string;
  description?: string;
  foods: ProductInterface[];
  available: boolean;
}
