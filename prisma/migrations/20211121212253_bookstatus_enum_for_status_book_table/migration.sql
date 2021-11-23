/*
  Warnings:

  - The `status` column on the `Book` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "BookStatus" AS ENUM ('COMPLETED', 'READING', 'READY', 'TO_READ');

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "status",
ADD COLUMN     "status" "BookStatus" NOT NULL DEFAULT E'TO_READ';
