/*
  Warnings:

  - You are about to drop the column `title` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Document` table. All the data in the column will be lost.
  - Added the required column `titre` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Document" DROP COLUMN "title",
DROP COLUMN "type",
ADD COLUMN     "titre" TEXT NOT NULL;
