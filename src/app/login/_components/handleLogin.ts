import { LoginSchema } from "@/zodSchemas/Auth/Login.schema";
import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";
import z from "zod";
// ====================================================
export const handleLogin = async (
  data: z.infer<typeof LoginSchema>,
  setServerError: Dispatch<SetStateAction<string>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setShowBlur: Dispatch<SetStateAction<boolean>>,
  setServerSuccess: Dispatch<SetStateAction<string>>,
  router: AppRouterInstance,
) => {
  setServerError("");
  setLoading(true);
  setShowBlur(true);
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
      { email: data.email, password: data.password },
      { withCredentials: true },
    );
    const { success, message } = response.data;
    if (!success) {
      setServerError(message);
      return;
    }
    setServerSuccess(message);
    router.refresh();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message: unknown = error.response?.data?.message;
      setServerError(
        typeof message === "string"
          ? message
          : "تعذر الاتصال بالسيرفر، حاول مرة أخرى.",
      );
    } else {
      setServerError("حدث خطأ غير متوقع.");
    }
  } finally {
    setLoading(false);
    setShowBlur(false);
  }
};
