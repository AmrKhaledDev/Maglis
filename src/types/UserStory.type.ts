import { Prisma } from "@prisma/client";
// =====================================
export type UserStory = Prisma.UserGetPayload<{
  select: {
    id: true;
    image: true;
    name: true;
    username: true;
    stories: {
      orderBy: {
        createdAt: "desc";
      };
      include: {
        _count: {
          select: {
            storyViews: true;
          };
        };
      };
    };
  };
}>;
