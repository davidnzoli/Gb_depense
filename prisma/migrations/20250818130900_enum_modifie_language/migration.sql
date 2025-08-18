/*
  Warnings:

  - The values [PLANNED,IN_PROGRESS,COMPLETED,ON_HOLD,CANCELED] on the enum `ProjectStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."ProjectStatus_new" AS ENUM ('PLANIFIE', 'EN_COURS', 'TERMINE', 'EN_ATTENTE', 'ANNULE');
ALTER TABLE "public"."Project" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."Project" ALTER COLUMN "status" TYPE "public"."ProjectStatus_new" USING ("status"::text::"public"."ProjectStatus_new");
ALTER TYPE "public"."ProjectStatus" RENAME TO "ProjectStatus_old";
ALTER TYPE "public"."ProjectStatus_new" RENAME TO "ProjectStatus";
DROP TYPE "public"."ProjectStatus_old";
ALTER TABLE "public"."Project" ALTER COLUMN "status" SET DEFAULT 'PLANIFIE';
COMMIT;

-- AlterTable
ALTER TABLE "public"."Project" ALTER COLUMN "status" SET DEFAULT 'PLANIFIE';
