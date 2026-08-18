/*
  Warnings:

  - You are about to drop the column `active` on the `Story` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Story" DROP COLUMN "active",
ADD COLUMN     "isPrivate" BOOLEAN NOT NULL DEFAULT false;
