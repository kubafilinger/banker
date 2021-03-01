import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { OperationDto } from '../../application/dtos/operation.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Operation } from '../../domain/operation.entity';
import { v4 as generateUuid } from 'uuid';

@Controller('/operation')
export class BankController {
  constructor(
    @InjectQueue('operations') private readonly operationsQueue: Queue,
  ) {}

  @Post()
  async operation(@Res() res: Response, @Body() operationDto: OperationDto) {
    try {
      const senderId = '123'; // by senderAccountNumber from repo
      const receiverId = '123'; //by receiverAccountNumber if exist

      await this.operationsQueue.add(
        operationDto.operationType,
        new Operation(
          generateUuid(),
          operationDto.amount,
          senderId,
          operationDto.operationType,
          receiverId,
        ),
      );

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
