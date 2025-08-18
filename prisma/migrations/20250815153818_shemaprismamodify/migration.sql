/*
  Warnings:

  - You are about to drop the column `budget` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `dateFin` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `datedebut` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `devisNumber` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Project" DROP COLUMN "budget",
DROP COLUMN "dateFin",
DROP COLUMN "datedebut",
DROP COLUMN "devisNumber";

-- CreateTable
CREATE TABLE "public"."Devise" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Devise_pkey" PRIMARY KEY ("id")
);
