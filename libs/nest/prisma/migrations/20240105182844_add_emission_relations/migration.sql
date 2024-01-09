/*
  Warnings:

  - You are about to drop the column `data_source_id` on the `emissions` table. All the data in the column will be lost.
  - Added the required column `integration_id` to the `emissions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "emissions" DROP COLUMN "data_source_id",
ADD COLUMN     "integration_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "emissions" ADD CONSTRAINT "emissions_integration_id_fkey" FOREIGN KEY ("integration_id") REFERENCES "integrations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
