import { Prisma } from "@prisma/client";
// ==================================
export type StoryType = Prisma.StoryGetPayload<{
  include: {
    user: true;
  };
}>;