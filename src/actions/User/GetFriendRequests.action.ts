"use server";

import GetSession from "@/auth/GetSession";
import { prisma } from "@/lib/prisma";
import FriendRequestType from "@/types/FriendRequest.type";
// ====================================================
export const GetFriendRequestsAction = async (): Promise<{
  success: boolean;
  message?: string;
  requests?: FriendRequestType[];
}> => {
  try {
    const userSession = await GetSession();
    if (!userSession) return { success: false, message: "برجاء تسجيل الدخول." };
    const requests = await prisma.friendRequest.findMany({
      where: {
        receiverId: userSession.id,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            image: true,
            bio: true,
          },
        },
      },
    });
    return { success: true, requests };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "حدث خطأ أثناء جلب طلبات الصداقة الخاصة بك.",
    };
  }
};
