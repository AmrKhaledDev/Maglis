import { Prisma } from "@prisma/client";
// ==================================
type StoryType = Prisma.StoryGetPayload<{
  include: {
    _count: {
      select: {
        storyViews: true;
      };
    };
  };
}>;
export default StoryType;
