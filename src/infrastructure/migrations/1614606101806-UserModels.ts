import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserModels1614606101806 implements MigrationInterface {
  name = 'UserModels1614606101806';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `user` (`id` varchar(255) NOT NULL, `amount` int NOT NULL, `name` varchar(255) NOT NULL, `accountNumber` varchar(255) NOT NULL, `identificationNumber` varchar(255) NOT NULL, UNIQUE INDEX `IDX_cc09a77e7c732ac84c7d4c1c82` (`accountNumber`), UNIQUE INDEX `IDX_844a616eae01474d38ec4f2f25` (`identificationNumber`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP INDEX `IDX_844a616eae01474d38ec4f2f25` ON `user`',
    );
    await queryRunner.query(
      'DROP INDEX `IDX_cc09a77e7c732ac84c7d4c1c82` ON `user`',
    );
    await queryRunner.query('DROP TABLE `user`');
  }
}
