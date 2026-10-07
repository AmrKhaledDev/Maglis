import { Prisma } from "@prisma/client";
// ========================================
type UserMemberType = Prisma.UserGetPayload<{
  select: {
    id: true;
    image: true;
    name: true;
    username: true;
    bio: true;
    city: true;
    jobTitle: true;
    professionalMode: true;
  };
}>;
export default UserMemberType;
