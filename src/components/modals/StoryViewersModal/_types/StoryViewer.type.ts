import { Prisma } from "@prisma/client";
// =======================================
type StoryViewerType = Prisma.StoryViewerGetPayload<{
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
export default StoryViewerType;
