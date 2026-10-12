import { Prisma } from "@prisma/client";
// ======================================
type FollowingType = Prisma.FollowGetPayload<{
  select: {
    following: {
      select: {
        id: true;
        image: true;
        name: true;
        professionalMode: true;
      };
    };
  };
}>;

export default FollowingType;
