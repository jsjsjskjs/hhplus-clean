import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLimitCol1711327743143 implements MigrationInterface {
    name = 'AddLimitCol1711327743143'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lecture_count" ADD "limit" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lecture_count" DROP COLUMN "limit"`);
    }

}
