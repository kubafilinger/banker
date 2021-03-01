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

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'operations',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'banker',
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [BankController, UsersController],
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
