import { Prisma } from "@prisma/client";
// =======================================
type UserConnectionType = Prisma.UserGetPayload<{
  select: {
    id: true;
    image: true;
    name: true;
    professionalMode: true;
  };
}>;

export default UserConnectionType;
