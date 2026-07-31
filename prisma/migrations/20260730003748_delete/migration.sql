/*
  Warnings:

  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Like` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LikeForComment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Media` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SavePost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SocialLink` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `accounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_parentId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_postId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_userId_fkey";

-- DropForeignKey
ALTER TABLE "LikeForComment" DROP CONSTRAINT "LikeForComment_commentId_fkey";

-- DropForeignKey
ALTER TABLE "LikeForComment" DROP CONSTRAINT "LikeForComment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_postId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "SavePost" DROP CONSTRAINT "SavePost_postId_fkey";

-- DropForeignKey
ALTER TABLE "SavePost" DROP CONSTRAINT "SavePost_userId_fkey";

-- DropForeignKey
ALTER TABLE "SocialLink" DROP CONSTRAINT "SocialLink_userId_fkey";

-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_user_id_fkey";

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "Like";

-- DropTable
DROP TABLE "LikeForComment";

-- DropTable
DROP TABLE "Media";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "SavePost";

-- DropTable
DROP TABLE "SocialLink";

-- DropTable
DROP TABLE "VerificationToken";

-- DropTable
DROP TABLE "accounts";

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "Gender";

-- DropEnum
DROP TYPE "MediaType";

-- DropEnum
DROP TYPE "Privacy";

-- DropEnum
DROP TYPE "Role";

-- DropEnum
DROP TYPE "SocialPlatform";
