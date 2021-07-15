import { Account } from '.'

export class Transaction {
  id?: string;
  type?: string;
  status?: string;
  amount?: number;
  dateCreated?: Date;
  dateModified?: Date;
  dateCompleted?: Date;
  accountId?: string;
  transferFrom?: Account;
  transferFromId?: string;
  transferTo?: Account;
  transferToId?: string;

}
