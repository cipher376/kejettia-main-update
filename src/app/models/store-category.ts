import { Photo, ProductCategory, Store } from ".";

export class StoreCategory {

  id?: string;
  name?: string;
  description?: string;


  photo?: Photo;
  productCategories?: ProductCategory[];
  stores?: Store[];
}
