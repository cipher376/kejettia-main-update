export enum RESET_REQUEST_TYPE {
  password = 'password',
  email = 'email',
  phone = 'phone'
}

export enum EMPLOYEE_TYPE {
  SELLER = 'SELLER',
  MANAGER = 'MANAGER',
  ADMINISTRATOR = 'ADMINISTRATOR',
  ASSISTANT = 'ASSISTANT',
  OTHER = 'OTHER'
}

export enum ACCOUNT_STATUS {
  LOCKED = 'LOCKED',
  OPERATIONAL = 'OPERATIONAL'
}

export enum TRANSACTION_TYPE {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
  TRANSFER = 'TRANSFER',
}

export enum TRANSACTION_STATUS {
  PENDING = 'PENDING',
  COMPLETE = 'COMPLETE',
  UNKNOWN = 'UNKNOWN'
}

export enum STATE {
  INITIALIZED = 'initialized',
  PENDING = 'pending',
  UNKNOWN = 'unknown',
  COMPLETE = 'complete',
  STOPPED = 'stopped',
  ONGOING = 'ongoing'
}

export enum ORDER_STATE {
  NEW = 'NEW',
  PENDING = 'PENDING',
  COMPLETE = 'COMPLETE',
  UNKNOWN = 'UNKNOWN',
  CANCELLED = 'CANCELLED',
  DELIVERED = 'DELIVERED',
  IN_TRANSIT = 'IN_TRANSIT'
}

