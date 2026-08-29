import { Prisma } from "@prisma/client";
// ==================================
export type UserStoriesWithFollowingsType = Prisma.UserGetPayload<{
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
    followings: {
      select: {
        following: {
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
        };
      };
    };
  };
}>;
