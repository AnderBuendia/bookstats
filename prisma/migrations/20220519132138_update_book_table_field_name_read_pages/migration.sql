/*
  Warnings:

  - You are about to drop the column `read_pages` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "read_pages",
ADD COLUMN     "readPages" INTEGER[];
