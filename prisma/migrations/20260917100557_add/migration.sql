/*
  Warnings:

  - Added the required column `mediaName` to the `MessageMedia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mediaSize` to the `MessageMedia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MessageMedia" ADD COLUMN     "mediaName" TEXT NOT NULL,
ADD COLUMN     "mediaSize" INTEGER NOT NULL;
