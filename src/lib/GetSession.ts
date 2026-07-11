import { auth } from "./auth";
import { prisma } from "./prisma";
// =====================================
 const GetSession = async () => {
  try {
    const session = await auth();
    if (!session || !session.user) return null;
    const existingUser = await prisma.user.findUnique({
      where: {
        id: session.user.id,
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
export default GetSession