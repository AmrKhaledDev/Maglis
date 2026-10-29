import { Prisma } from "@prisma/client";
// =========================================
type FriendRequest = Prisma.FriendRequestGetPayload<{
  include: {
    sender: {
      select: {
        id: true;
        image: true;
        name: true;
        bio: true;
      };
    };
  };
}>;
export default FriendRequest;
