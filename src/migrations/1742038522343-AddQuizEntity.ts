import { MigrationInterface, QueryRunner } from "typeorm";

export class AddQuizEntity1742038522343 implements MigrationInterface {
    name = 'AddQuizEntity1742038522343'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "quiz_questions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "question" character varying NOT NULL, "answerOptions" text array NOT NULL, "correctAnswer" character varying NOT NULL, "quizId" uuid, CONSTRAINT "PK_ec0447fd30d9f5c182e7653bfd3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "quizzes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "companyId" uuid, CONSTRAINT "PK_b24f0f7662cf6b3a0e7dba0a1b4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "quiz_questions" ADD CONSTRAINT "FK_8889ccc5a40989ea308a588870e" FOREIGN KEY ("quizId") REFERENCES "quizzes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quizzes" ADD CONSTRAINT "FK_5b10313e300a524a79e4216d20f" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quizzes" DROP CONSTRAINT "FK_5b10313e300a524a79e4216d20f"`);
        await queryRunner.query(`ALTER TABLE "quiz_questions" DROP CONSTRAINT "FK_8889ccc5a40989ea308a588870e"`);
        await queryRunner.query(`DROP TABLE "quizzes"`);
        await queryRunner.query(`DROP TABLE "quiz_questions"`);
    }

}
