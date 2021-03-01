import { OperationValidator } from './operation.validator';
import { Operation } from '../operation.entity';

export class DepositOperationValidator implements OperationValidator {
  validate(operation: Operation): void {
    if (operation.amount <= 0) {
      throw new Error('Amount to deposit should be greater then 0');
    }
  }
}
