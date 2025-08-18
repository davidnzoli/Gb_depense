/*
  Warnings:

  - The `status` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."ProjectStatus" AS ENUM ('PLANNED', 'IN_PROGRESS', 'COMPLETED', 'ON_HOLD', 'CANCELED');

-- AlterTable
ALTER TABLE "public"."Project" DROP COLUMN "status",
ADD COLUMN     "status" "public"."ProjectStatus" NOT NULL DEFAULT 'PLANNED';
