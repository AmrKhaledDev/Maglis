/*
  Warnings:

  - Made the column `lastSeenAt` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "SocialPlatform" AS ENUM ('GITHUB', 'FACEBOOK', 'INSTAGRAM', 'X', 'LINKEDIN');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "coverImage" TEXT,
ADD COLUMN     "education" TEXT,
ADD COLUMN     "jobTitle" TEXT,
ADD COLUMN     "nickname" TEXT,
ALTER COLUMN "lastSeenAt" SET NOT NULL,
ALTER COLUMN "lastSeenAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "SocialLink" (
    "id" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "platform" "SocialPlatform" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SocialLink_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SocialLink" ADD CONSTRAINT "SocialLink_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
