import { OperationValidator } from './operation.validator';
import { Operation } from '../operation.entity';

export class TransferOperationValidator implements OperationValidator {
  validate(operation: Operation): void {
    if (operation.amount <= 0) {
      throw new Error('Amount to transfer should be greater then 0');
    }

    if (operation.sender.amount < operation.amount) {
      throw new Error('Not enough money.');
    }

    if (operation.sender.id === operation.receiver.id) {
      throw new Error('Cannot transfer money to yourself.');
    }
  }
}
