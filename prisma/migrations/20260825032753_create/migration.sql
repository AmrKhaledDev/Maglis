-- CreateEnum
CREATE TYPE "FriendshipsStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateTable
CREATE TABLE "Friendships" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "status" "FriendshipsStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Friendships_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Friendships_receiverId_status_idx" ON "Friendships"("receiverId", "status");

-- CreateIndex
CREATE INDEX "Friendships_senderId_status_idx" ON "Friendships"("senderId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "Friendships_senderId_receiverId_key" ON "Friendships"("senderId", "receiverId");

-- AddForeignKey
ALTER TABLE "Friendships" ADD CONSTRAINT "Friendships_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendships" ADD CONSTRAINT "Friendships_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
