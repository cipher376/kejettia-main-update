import { OperationState, RESET_REQUEST_TYPE } from '.';
export class ResetRequest {
  id?: string;
  resetToken?: string;
  dateCreated?: Date;
  dateModified?: Date;
  state?: OperationState;
  expiredTimeInMin?: number;
  requestType?: RESET_REQUEST_TYPE;


  userId?: string;
}
