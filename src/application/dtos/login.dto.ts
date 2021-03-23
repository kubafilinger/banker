import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'Krzysztof Krzysztof' })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({ example: 'PESEL' })
  @IsString()
  @MinLength(3)
  identificationNumber: string;
}
