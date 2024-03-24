import { MigrationInterface, QueryRunner } from "typeorm";

export class InitEntity1711223628551 implements MigrationInterface {
    name = 'InitEntity1711223628551'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lecture" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying, "updatedBy" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "openDate" TIMESTAMP NOT NULL, "lectureDate" TIMESTAMP NOT NULL, CONSTRAINT "PK_2abef7c1e52b7b58a9f905c9643" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying, "updatedBy" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lecture_registration" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying, "updatedBy" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "lectureId" uuid NOT NULL, "clientId" uuid NOT NULL, CONSTRAINT "PK_fb3aa18a56224bbe2e56555185d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "lecture_registration" ADD CONSTRAINT "FK_ba803bb706cc3ebe705209a75cb" FOREIGN KEY ("lectureId") REFERENCES "lecture"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lecture_registration" ADD CONSTRAINT "FK_8e30b5e0747ee978da4dc5e2927" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lecture_registration" DROP CONSTRAINT "FK_8e30b5e0747ee978da4dc5e2927"`);
        await queryRunner.query(`ALTER TABLE "lecture_registration" DROP CONSTRAINT "FK_ba803bb706cc3ebe705209a75cb"`);
        await queryRunner.query(`DROP TABLE "lecture_registration"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TABLE "lecture"`);
    }

}
