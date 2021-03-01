import { Process, Processor } from '@nestjs/bull';
import { Operation, OperationType } from '../../domain/operation.entity';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';

@Processor('operations')
export class OperationsProcessor {
  private readonly logger = new Logger(OperationsProcessor.name);

  constructor(private readonly usersRepository: UsersRepository) {}

  @Process(OperationType.DEPOSIT)
  async handleDeposit(job: Job<Operation>) {
    const { sender, amount } = job.data;

    this.logger.debug(job.data);

    const latestSenderData = await this.usersRepository.findById(sender.id);

    latestSenderData.deposit(amount);

    await this.usersRepository.save(latestSenderData);
  }

  @Process(OperationType.WITHDRAWAL)
  async handleWithdrawal(job: Job<Operation>) {
    const { sender, amount } = job.data;

    this.logger.debug(job.data);

    try {
      const latestSenderData = await this.usersRepository.findById(sender.id);

      latestSenderData.withdraw(amount);

      await this.usersRepository.save(latestSenderData);
    } catch (e) {
      this.logger.error(e);
    }
  }

  @Process(OperationType.TRANSFER)
  async handleTransfer(job: Job<Operation>) {
    const { sender, receiver, amount } = job.data;

    this.logger.debug(job.data);

    try {
      const latestSenderData = await this.usersRepository.findById(sender.id);
      const latestReceiverData = await this.usersRepository.findById(
        receiver.id,
      );

      latestSenderData.withdraw(amount);
      latestReceiverData.deposit(amount);

      await this.usersRepository.transferSave(
        latestSenderData,
        latestReceiverData,
      );
    } catch (e) {
      this.logger.error(e);
    }
  }
}
