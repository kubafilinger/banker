import { OperationType } from '../../domain/operation.entity';
import { IsEnum, IsNotEmpty, IsNumber, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OperationDto {
  @ApiProperty({ enum: OperationType, example: OperationType.TRANSFER })
  @IsEnum(OperationType)
  operationType: OperationType;

  @ApiProperty({ example: 100 })
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  accountNumber: string;

  @ApiProperty({
    example: 'only if operation type is transfer',
    required: false,
  })
  @ValidateIf((dto) => dto.operationType === OperationType.TRANSFER)
  @IsNotEmpty()
  receiverAccountNumber: string | null;
}
