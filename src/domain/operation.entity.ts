export enum OperationType {
  WITHDRAWAL = 'withdrawal',
  DEPOSIT = 'deposit',
  TRANSFER = 'transfer',
}

export class OperationEntity {
  id: string;

  amount: number;

  userId: string;

  receiverId: string;

  type: OperationType;
}
