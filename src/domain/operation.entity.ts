import { User } from './user.entity';

export enum OperationType {
  WITHDRAWAL = 'withdrawal',
  DEPOSIT = 'deposit',
  TRANSFER = 'transfer',
}

export class Operation {
  constructor(
    readonly id: string,
    readonly amount: number,
    readonly sender: User,
    readonly type: OperationType,
    readonly receiver?: User,
  ) {}
}
