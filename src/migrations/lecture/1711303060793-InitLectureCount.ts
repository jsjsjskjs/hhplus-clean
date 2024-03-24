import { MigrationInterface, QueryRunner } from "typeorm";

export class InitLectureCount1711303060793 implements MigrationInterface {
    name = 'InitLectureCount1711303060793'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lecture_count" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying, "updatedBy" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "lectureId" uuid NOT NULL, CONSTRAINT "REL_0f3e0d77c9f42c70b885c32a4a" UNIQUE ("lectureId"), CONSTRAINT "PK_759753895913fa33cc622f1cfd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "lecture" ADD "countId" uuid`);
        await queryRunner.query(`ALTER TABLE "lecture" ADD CONSTRAINT "UQ_01b275742aea44988f6a1a96450" UNIQUE ("countId")`);
        await queryRunner.query(`ALTER TABLE "lecture_count" ADD CONSTRAINT "FK_0f3e0d77c9f42c70b885c32a4a0" FOREIGN KEY ("lectureId") REFERENCES "lecture"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lecture" ADD CONSTRAINT "FK_01b275742aea44988f6a1a96450" FOREIGN KEY ("countId") REFERENCES "lecture_count"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lecture" DROP CONSTRAINT "FK_01b275742aea44988f6a1a96450"`);
        await queryRunner.query(`ALTER TABLE "lecture_count" DROP CONSTRAINT "FK_0f3e0d77c9f42c70b885c32a4a0"`);
        await queryRunner.query(`ALTER TABLE "lecture" DROP CONSTRAINT "UQ_01b275742aea44988f6a1a96450"`);
        await queryRunner.query(`ALTER TABLE "lecture" DROP COLUMN "countId"`);
        await queryRunner.query(`DROP TABLE "lecture_count"`);
    }

}
