/*
  Warnings:

  - You are about to drop the `StoryView` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "StoryView" DROP CONSTRAINT "StoryView_storyId_fkey";

-- DropForeignKey
ALTER TABLE "StoryView" DROP CONSTRAINT "StoryView_viewerId_fkey";

-- DropTable
DROP TABLE "StoryView";

-- CreateTable
CREATE TABLE "StoryViewer" (
    "id" TEXT NOT NULL,
    "viewerId" TEXT NOT NULL,
    "storyId" TEXT NOT NULL,
    "isLiked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StoryViewer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StoryViewer_viewerId_storyId_key" ON "StoryViewer"("viewerId", "storyId");

-- AddForeignKey
ALTER TABLE "StoryViewer" ADD CONSTRAINT "StoryViewer_viewerId_fkey" FOREIGN KEY ("viewerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoryViewer" ADD CONSTRAINT "StoryViewer_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE CASCADE ON UPDATE CASCADE;
