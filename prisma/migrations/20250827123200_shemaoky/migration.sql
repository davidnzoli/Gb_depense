/*
  Warnings:

  - You are about to drop the `ConfigProject` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."ConfigProject" DROP CONSTRAINT "ConfigProject_projectId_fkey";

-- AlterTable
ALTER TABLE "public"."Expense" ADD COLUMN     "devise" TEXT;

-- AlterTable
ALTER TABLE "public"."Project" ADD COLUMN     "budget" DOUBLE PRECISION,
ADD COLUMN     "dateFin" TIMESTAMP(3),
ADD COLUMN     "datedebut" TIMESTAMP(3),
ADD COLUMN     "devisNumber" TEXT;

-- DropTable
DROP TABLE "public"."ConfigProject";
