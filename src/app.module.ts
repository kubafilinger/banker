import { Module } from '@nestjs/common';
import { BankController } from './infrastructure/controllers/bank.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [BankController],
  providers: [AppService],
})
export class AppModule {}
