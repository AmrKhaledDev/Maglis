import { Prisma } from "@prisma/client";
// ===================================================
type FollowerType = Prisma.FollowGetPayload<{
  select: {
    follower: {
      select: {
        id: true;
        image: true;
        name: true;
        professionalMode: true;
      };
    };
  };
}>;
export default FollowerType;
