import { SessionWithoutPasswordType } from "@/types/SessionWithoutPassword.type";
import { auth } from "../lib/auth";
import { prisma } from "../lib/prisma";
// =====================================
const GetSession = async ():Promise<SessionWithoutPasswordType | null> => {
  try {
    const session = await auth();
    if (!session || !session.user) return null;
    const existingUser = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        savedPosts: true,
      },
    });
    if (!existingUser) return null;
    const { password, ...user } = existingUser;
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export default GetSession;
