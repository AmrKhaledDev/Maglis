import { Prisma } from "@prisma/client";
// =====================================
type FriendshipType = Prisma.FriendshipGetPayload<{
  select: {
    friend: {
      select: {
        id: true;
        image: true;
        name: true;
        professionalMode: true;
      };
    };
  };
}>;
export default FriendshipType;
