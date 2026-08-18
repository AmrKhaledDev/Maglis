import { Prisma } from "@prisma/client";
// ==================================
export type StoryType = Prisma.StoryGetPayload<{
  include: {
    user: {
      select: {
        id: true;
        image: true;
        name: true;
        username: true;
      };
    };
  };
}>;
