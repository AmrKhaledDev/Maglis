import dayjs from "dayjs";
import GetSession from "./GetSession";
import { SessionWithoutPasswordType } from "@/types/SessionWithoutPassword.type";
import "dayjs/locale/ar";
// ===========================================================================
dayjs.locale("ar");
const validateSession = async (): Promise<{
  success: boolean;
  session?: SessionWithoutPasswordType;
  message?: string;
}> => {
  try {
    const userSession = await GetSession();
    if (!userSession)
      return {
        success: false,
        message: "برجاء تسجيل الدخول أو التسجيل.",
      };
    if (userSession.isPermanentlyBanned)
      return {
        success: false,
        message: "تم إيقاف حسابك بشكل دائم لا يمكنك التفاعل.",
      };
    if (userSession.banExpiresAt && userSession.banExpiresAt > new Date())
      return {
        success: false,
        message: `تم إيقاف حسابك مؤقتاً حتى ${dayjs(userSession.banExpiresAt).format("D MMMM YYYY - h:mm A")}`,
      };
    return { success: true, session: userSession };
  } catch (error) {
    console.error(error);
    return { success: false, message: "حدث خطأ أثناء التحقق من حسابك." };
  }
};

export default validateSession;
