/*
  Warnings:

  - Added the required column `mindmap_id` to the `Connection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Connection" ADD COLUMN     "mindmap_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_mindmap_id_fkey" FOREIGN KEY ("mindmap_id") REFERENCES "Mindmap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
