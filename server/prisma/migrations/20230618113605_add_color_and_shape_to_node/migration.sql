/*
  Warnings:

  - Added the required column `color` to the `Node` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shape` to the `Node` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Node" ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "shape" TEXT NOT NULL;
