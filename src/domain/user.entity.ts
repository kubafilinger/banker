import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  amount: number;

  @Column()
  name: string;

  @Column()
  @Index({ unique: true })
  accountNumber: string;

  @Column()
  @Index({ unique: true })
  identificationNumber: string;

  constructor(
    id: string,
    amount: number,
    name: string,
    accountNumber: string,
    identificationNumber: string,
  ) {
    this.id = id;
    this.amount = amount;
    this.name = name;
    this.accountNumber = accountNumber;
    this.identificationNumber = identificationNumber;
  }

  public deposit(amount: number): void {
    if (amount > 0) {
      this.amount += amount;
    } else {
      throw new Error('Amount to deposit should be greater then 0');
    }
  }

  public withdraw(amount: number): void {
    if (amount > 0 && this.amount - amount >= 0) {
      this.amount -= amount;
    } else {
      throw new Error('Not enough money.');
    }
  }
}
