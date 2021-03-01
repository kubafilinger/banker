import { Operation } from '../operation.entity';

export interface OperationValidator {
  validate(operation: Operation): void;
}
