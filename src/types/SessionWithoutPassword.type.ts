import { Prisma } from "@prisma/client";
// ===========================================
type UserWithSavedPosts = Prisma.UserGetPayload<{
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
  };
}>;
export type SessionWithoutPasswordType = Omit<UserWithSavedPosts, "password">;
