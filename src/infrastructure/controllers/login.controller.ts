import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UsersRepository } from '../repositories/users.repository';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../../application/dtos/login.dto';

@Controller('')
export class LoginController {
  constructor(private readonly repository: UsersRepository) {}

  @ApiTags('users')
  @Post('login')
  async login(@Res() res: Response, @Body() loginDto: LoginDto) {
    try {
      const user = await this.repository.findByIdentificationNumber(
        loginDto.identificationNumber,
      );

      if (user.name !== loginDto.name) {
        throw new Error('Bad credentials');
      }

      return res.status(200).send(user);
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: {
          message: e.message,
        },
      });
    }
  }
}
