import { MigrationInterface, QueryRunner } from "typeorm";

export class EditLectureCount1711304366155 implements MigrationInterface {
    name = 'EditLectureCount1711304366155'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lecture_count" ADD "count" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lecture_count" DROP COLUMN "count"`);
    }

}
