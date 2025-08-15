-- DropIndex
DROP INDEX "public"."User_email_key";

-- AlterTable
ALTER TABLE "public"."Service" ADD COLUMN     "rubriqueId" TEXT;

-- CreateTable
CREATE TABLE "public"."rubrique" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rubrique_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Service" ADD CONSTRAINT "Service_rubriqueId_fkey" FOREIGN KEY ("rubriqueId") REFERENCES "public"."rubrique"("id") ON DELETE SET NULL ON UPDATE CASCADE;
