import { Module } from '@nestjs/common';
import { BankController } from './infrastructure/controllers/bank.controller';
import { BullModule } from '@nestjs/bull';
import { OperationsProcessor } from './infrastructure/processors/operations.processor';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'operations',
    }),
  ],
  controllers: [BankController],
  providers: [OperationsProcessor],
})
export class AppModule {}
