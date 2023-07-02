import { FoodInterface } from "./FoodInterface";

export interface StoreInterface {
  id?: string;
  name: string;
  description?: string;
  foods: FoodInterface[];
  available: boolean;
}
