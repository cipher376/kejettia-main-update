import { Photo, ProductCategory, Store } from ".";

export class StoreCategory {

  id?: string;
  name?: string;
  description?: string;
  icon?: string;

  photo?: Photo;
  productCategories?: ProductCategory[];
  stores?: Store[];
}
