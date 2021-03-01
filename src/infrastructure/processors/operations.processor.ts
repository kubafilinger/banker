import { Process, Processor } from '@nestjs/bull';
import { Operation, OperationType } from '../../domain/operation.entity';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';

@Processor('operations')
export class OperationsProcessor {
  private readonly logger = new Logger(OperationsProcessor.name);

  @Process(OperationType.DEPOSIT)
  async handleDeposit(job: Job<Operation>) {
    const operation = job.data;

    this.logger.debug(operation);

    // TODO: save to db
  }

  @Process(OperationType.WITHDRAWAL)
  async handleWithdrawal(job: Job<Operation>) {
    const operation = job.data;

    this.logger.debug(operation);

    // TODO: save to db
  }

  @Process(OperationType.TRANSFER)
  async handleTransfer(job: Job<Operation>) {
    const operation = job.data;

    this.logger.debug(operation);

    // TODO: save to db
  }
}
