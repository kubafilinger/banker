import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersRepository } from '../repositories/users.repository';
import { UserDto } from '../../application/dtos/user.dto';
import { User } from '../../domain/user.entity';
import { v4 as generateUuid } from 'uuid';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('/users')
export class UsersController {
  constructor(private readonly repository: UsersRepository) {}

  @ApiTags('users')
  @Get()
  async list(@Res() res: Response) {
    try {
      return res.status(200).send(await this.repository.users());
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: {
          message: e.message,
        },
      });
    }
  }

  @ApiTags('users')
  @Get(':identificationNumber')
  async getOne(
    @Res() res: Response,
    @Param('identificationNumber') identificationNumber: string,
  ) {
    try {
      return res
        .status(200)
        .send(
          await this.repository.findByIdentificationNumber(
            identificationNumber,
          ),
        );
    } catch (e) {
      return res.status(HttpStatus.NOT_FOUND).json({
        error: {
          message: e.message,
        },
      });
    }
  }

  @ApiTags('users')
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiResponse({ status: 400, description: 'Error' })
  @Post()
  async create(@Res() res: Response, @Body() userDto: UserDto) {
    try {
      const user = new User(
        generateUuid(),
        userDto.startAmount,
        userDto.name,
        this.generateAccountNumber(),
        userDto.identificationNumber,
      );

      await this.repository.save(user);

      return res.status(201).send(user);
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: {
          message: e.message,
        },
      });
    }
  }

  private generateAccountNumber(): string {
    return Math.floor(Math.random() * 100000).toString();
  }
}
