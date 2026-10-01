/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Init1790833621953 {
    name = 'Init1790833621953'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "SKILL" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_0780a3ef1d521b8bee1c9b240de" UNIQUE ("name"), CONSTRAINT "PK_90109ddb53b4c7cf8efe1efad0d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "CREDITPACKAGE" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "credit_amount" integer NOT NULL, "price" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_5f7fcfe6a64e810c8dbad5f77e8" UNIQUE ("name"), CONSTRAINT "PK_7c075d2494e100e0b8ca472f734" PRIMARY KEY ("id"))`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "CREDITPACKAGE"`);
        await queryRunner.query(`DROP TABLE "SKILL"`);
    }
}
