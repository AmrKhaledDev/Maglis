import { Prisma } from "@prisma/client";
// ==================================
export const storyUserSelect = {
  id: true,
  image: true,
  name: true,
  username: true,
  stories: {
    where: {
      expiresAt: {
        gte: new Date(),
      },
      isPrivate: false,
    },
    include: {
      _count: {
        select: {
          storyViews: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  },
} satisfies Prisma.UserSelect;

export type UserWithStoriesFeed = Prisma.UserGetPayload<{
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
          select: typeof storyUserSelect;
        };
      };
    };
    friendships: {
      select: {
        friend: {
          select: typeof storyUserSelect;
        };
      };
    };
  };
}>;
