import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../domain/user.entity';
import { Connection, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
    private readonly connection: Connection,
  ) {}

  async users(): Promise<User[]> {
    return await this.repository.find();
  }

  async save(user: User): Promise<void> {
    await this.repository.save(user);
  }

  async findByAccountNumber(accountNumber: string): Promise<User> {
    return await this.repository.findOneOrFail({ accountNumber });
  }

  async findById(id: string): Promise<User> {
    return await this.repository.findOneOrFail(id);
  }

  async transferSave(sender: User, receiver: User): Promise<void> {
    await this.connection.transaction(async (manager) => {
      await manager.save(sender);
      await manager.save(receiver);
    });
  }
}
