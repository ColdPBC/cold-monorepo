/*
  Warnings:

  - You are about to drop the `ecoinvent_activity_classification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
ALTER TABLE ecoinvent_activity_classification RENAME TO ecoinvent_classifications;
