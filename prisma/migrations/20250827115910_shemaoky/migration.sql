-- CreateTable
CREATE TABLE "public"."ConfigProject" (
    "id" TEXT NOT NULL,
    "budget" DOUBLE PRECISION,
    "devisNumber" TEXT,
    "datedebut" TIMESTAMP(3) NOT NULL,
    "dateFin" TIMESTAMP(3) NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "ConfigProject_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."ConfigProject" ADD CONSTRAINT "ConfigProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
