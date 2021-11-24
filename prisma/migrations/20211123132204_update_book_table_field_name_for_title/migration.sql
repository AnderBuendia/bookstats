/*
  Warnings:

  - You are about to drop the column `name` on the `Book` table. All the data in the column will be lost.
  - Added the required column `title` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "name",
ADD COLUMN     "title" TEXT NOT NULL;
