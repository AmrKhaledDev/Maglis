import { Prisma } from "@prisma/client";
// ===========================================
type User = Prisma.UserGetPayload<{
  include: {
    savedPosts: {
      select: { postId: true };
    };
    sender: {
      select: {
        id: true;
        receiverId: true;
      };
    };
    followings: {
      select: {
        followingId: true;
      };
    };
    _count: {
      select: {
        receiver: true;
      };
    };
    myFriends: {
      select: {
        friend: {
          select: {
            id: true;
          };
        };
      };
    };
  };
}>;
export type SessionWithoutPasswordType = Omit<User, "password">;
