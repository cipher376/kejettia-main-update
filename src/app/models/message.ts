import { Photo } from ".";



export class Message {
  id: any;
  fullname?: string;
  from?: string;
  to?: string;
  cc?: string;
  subject?: string;
  content?: string;
  phone?: string;
  hasAttachment?: boolean;
  isImportant?: boolean;
  isRead?: boolean;
  isTrash?: boolean;
  isPermanentDelete?: boolean;
  replyId: any;
  createdAt?: Date;
  updatedAt?: Date;
  photos?: Photo[];
  replies?: Message[];
  constructor() {
  }
}
