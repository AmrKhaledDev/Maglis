import { Prisma } from "@prisma/client";
// =======================================
export type StoryViewer = Prisma.StoryViewerGetPayload<{
  include: {
    viewer: {
      select: {
        id: true;
        image: true;
        name: true;
        username: true;
      };
    };
  };
}>;
