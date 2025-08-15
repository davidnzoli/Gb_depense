/*
  Warnings:

  - You are about to drop the column `rubrique` on the `Expense` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Expense" DROP COLUMN "rubrique",
ADD COLUMN     "rubriqueId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_rubriqueId_fkey" FOREIGN KEY ("rubriqueId") REFERENCES "public"."Rubrique"("id") ON DELETE SET NULL ON UPDATE CASCADE;
