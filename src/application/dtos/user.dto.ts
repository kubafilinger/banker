import { IsNumber, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 'Krzysztof Krzysztof' })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({ example: 1000 })
  @IsNumber()
  startAmount: number;

  @ApiProperty({ example: 'PESEL' })
  @IsString()
  @MinLength(3)
  identificationNumber: string;
}
