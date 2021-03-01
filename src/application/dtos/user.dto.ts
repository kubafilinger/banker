import { OperationType } from '../../domain/operation.entity';
import { IsNumber, IsString, MinLength } from 'class-validator';

export class UserDto {
  @IsString()
  @MinLength(3)
  name: OperationType;

  @IsNumber()
  startAmount: number;

  @IsString()
  @MinLength(3)
  identificationNumber: string;
}
