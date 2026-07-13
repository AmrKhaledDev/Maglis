import dayjs from "dayjs";
import GetSession from "./GetSession";
import { SessionWithoutPasswordType } from "@/types/SessionWithoutPasswordType";
import "dayjs/locale/ar";
// ===========================================================================
dayjs.locale("ar");
const validateSession = async (): Promise<{
  success: boolean;
  session?: SessionWithoutPasswordType;
  message?: string;
}> => {
  try {
    const session = await GetSession();
    if (!session)
      return {
        success: false,
        message: "برجاء تسجيل الدخول أو التسجيل.",
      };
    if (session.isPermanentlyBanned)
      return {
        success: false,
        message: "تم إيقاف حسابك بشكل دائم.",
      };
    if (session.banExpiresAt && session.banExpiresAt > new Date())
      return {
        success: false,
        message: `تم إيقاف حسابك مؤقتاً حتى ${dayjs(session.banExpiresAt).format("D MMMM YYYY - h:mm A")}`,
      };
    return { success: true, session };
  } catch (error) {
    console.error(error);
    return { success: false, message: "حدث خطأ أثناء التحقق من حسابك." };
  }
};

export default validateSession;
