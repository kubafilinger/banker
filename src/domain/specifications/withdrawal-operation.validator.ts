import { OperationValidator } from './operation.validator';
import { Operation } from '../operation.entity';

export class WithdrawalOperationValidator implements OperationValidator {
  validate(operation: Operation): void {
    if (operation.amount <= 0) {
      throw new Error('Amount to withdrawal should be greater then 0');
    }

    if (operation.sender.amount < operation.amount) {
      throw new Error('Not enough money.');
    }
  }
}
