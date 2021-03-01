export enum OperationType {
  WITHDRAWAL = 'withdrawal',
  DEPOSIT = 'deposit',
  TRANSFER = 'transfer',
}

export class Operation {
  id: string;

  amount: number;

  senderId: string;

  receiverId: string | null;

  type: OperationType;

  constructor(
    id: string,
    amount: number,
    senderId: string,
    type: OperationType,
    receiverId?: string,
  ) {
    this.id = id;
    this.amount = amount;
    this.senderId = senderId;
    this.type = type;
    this.receiverId = receiverId;
  }
}
