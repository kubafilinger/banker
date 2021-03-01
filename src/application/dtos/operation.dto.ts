import { OperationType } from '../../domain/operation.entity';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  ValidateIf,
} from 'class-validator';

export class OperationDto {
  @IsEnum(OperationType)
  operationType: OperationType;

  @IsNumber()
  amount: number;

  @IsNotEmpty()
  senderAccountNumber: string;

  @ValidateIf((dto) => dto.operationType === OperationType.TRANSFER)
  @IsNotEmpty()
  receiverAccountNumber: string | null;
}
