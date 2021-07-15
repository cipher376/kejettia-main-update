import { StorePolicy } from ".";
import { MyFile } from "./file";

export class PolicyStatement {

  id?: string;
  name?: string;
  content?: string;
  sign?: string;


  storeId?: string;
  file?: MyFile;
  storePolicyTypeId?: string;
}
