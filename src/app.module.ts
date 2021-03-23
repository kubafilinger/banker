import { Module } from '@nestjs/common';
import { BankController } from './infrastructure/controllers/bank.controller';
import { BullModule } from '@nestjs/bull';
import { OperationsProcessor } from './infrastructure/processors/operations.processor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './infrastructure/repositories/users.repository';
import { User } from './domain/user.entity';
import { UsersController } from './infrastructure/controllers/users.controller';
import { WithdrawalOperationValidator } from './domain/specifications/withdrawal-operation.validator';
import { TransferOperationValidator } from './domain/specifications/transfer-operation.validator';
import { DepositOperationValidator } from './domain/specifications/deposit-operation.validator';
import * as getenv from 'getenv';
import { LogsController } from './infrastructure/controllers/logs.controller';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: getenv('REDIS_HOST'),
        port: parseInt(getenv('REDIS_PORT'), 10),
        password: getenv('REDIS_PASSWORD'),
      },
    }),
    BullModule.registerQueue({
      name: 'operations',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: getenv('DATABASE_HOST'),
      port: parseInt(getenv('DATABASE_PORT'), 10),
      username: getenv('DATABASE_USERNAME'),
      password: getenv('DATABASE_PASSWORD'),
      database: getenv('DATABASE_NAME'),
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [BankController, UsersController, LogsController],
  providers: [
    OperationsProcessor,
    UsersRepository,
    {
      provide: 'withdrawalOperationValidator',
      useClass: WithdrawalOperationValidator,
    },
    {
      provide: 'depositOperationValidator',
      useClass: DepositOperationValidator,
    },
    {
      provide: 'transferOperationValidator',
      useClass: TransferOperationValidator,
    },
  ],
})
export class AppModule {}
