import { PayStackEvents, Transaction } from ".";

export class Account{

  id?: string;
  accountNumber?: string;
  balance?: number;
  isLocked?: boolean;
  transactions?: Transaction[];
  payStackEvents?: PayStackEvents[];
  employeeId?: string;
  transferFromTransactionId?: string;
  transferToTransactionId?: string;

}
