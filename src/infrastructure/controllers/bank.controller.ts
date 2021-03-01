import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { OperationDto } from '../../application/dtos/operation.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Operation } from '../../domain/operation.entity';
import { v4 as generateUuid } from 'uuid';
import { UsersRepository } from '../repositories/users.repository';
import { ModuleRef } from '@nestjs/core';
import { OperationValidator } from '../../domain/specifications/operation.validator';

@Controller('/operations')
export class BankController {
  constructor(
    @InjectQueue('operations') private readonly operationsQueue: Queue,
    private readonly usersRepository: UsersRepository,
    private moduleRef: ModuleRef,
  ) {}

  @Post()
  async operation(@Res() res: Response, @Body() operationDto: OperationDto) {
    try {
      const sender = await this.usersRepository.findByAccountNumber(
        operationDto.accountNumber,
      );
      const receiver = operationDto.receiverAccountNumber
        ? await this.usersRepository.findByAccountNumber(
            operationDto.receiverAccountNumber,
          )
        : null;

      const operation = new Operation(
        generateUuid(),
        operationDto.amount,
        sender,
        operationDto.operationType,
        receiver ? receiver : null,
      );
      const validator = await this.moduleRef.get<OperationValidator>(
        `${operationDto.operationType}OperationValidator`,
      );

      validator.validate(operation);

      await this.operationsQueue.add(operationDto.operationType, operation);

      return res.status(204).json(operationDto);
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: {
          message: e.message,
        },
      });
    }
  }
}
