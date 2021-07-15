export interface PolicyType {
  id: string;
  name?: string;
  description?: string;
}

export class StorePolicy {

  id?: string;
  name?: string;
  description?: string;
  policyStatementId?: string;
}
