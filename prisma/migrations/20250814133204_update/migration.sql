/*
  Warnings:

  - You are about to drop the `rubrique` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Service" DROP CONSTRAINT "Service_rubriqueId_fkey";

-- DropTable
DROP TABLE "public"."rubrique";

-- CreateTable
CREATE TABLE "public"."Rubrique" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rubrique_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Service" ADD CONSTRAINT "Service_rubriqueId_fkey" FOREIGN KEY ("rubriqueId") REFERENCES "public"."Rubrique"("id") ON DELETE SET NULL ON UPDATE CASCADE;
