import { Photo } from "./photo";

export class Company {
  id: string;
  name: string;
  description: string;
  photos: Photo[] = [];
  companyCategories: any
  dateCreated: Date
}
