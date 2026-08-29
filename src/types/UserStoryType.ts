import { Prisma } from "@prisma/client";
// =====================================
export type UserStoryType = Prisma.UserGetPayload<{
  select: {
    id: true;
    image: true;
    name: true;
    username: true;
    stories: {
      orderBy: {
        createdAt: "desc";
      };
    };
  };
}>;
