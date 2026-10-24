import { Prisma } from "@prisma/client";
// ==================================
export type UserStoriesWithFollowingsType = Prisma.UserGetPayload<{
  select: {
    id: true;
    image: true;
    name: true;
    username: true;
    stories: {
      include: {
        _count: {
          select: {
            storyViews: true;
          };
        };
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
              include: {
                _count: {
                  select: {
                    storyViews: true;
                  };
                };
              };
            };
          };
        };
      };
    };
    myFriends: {
      select: {
        friend: {
          select: {
            id: true;
            image: true;
            name: true;
            username: true;
            stories: {
              include: {
                _count: {
                  select: {
                    storyViews: true;
                  };
                };
              };
            };
          };
        };
      };
    };
  };
}>;
