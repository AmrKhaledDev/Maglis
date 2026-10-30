import { RegisterSchema } from "@/zodSchemas/Auth/Register.schema";
import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";
import { UseFormReset } from "react-hook-form";
import z from "zod";
// ==================================================================
export const handleRegister = async (
  data: z.infer<typeof RegisterSchema>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setServerError: Dispatch<SetStateAction<string>>,
  setShowBlur: Dispatch<SetStateAction<boolean>>,
  setServerSuccess: Dispatch<SetStateAction<string>>,
  router: AppRouterInstance,
  reset: UseFormReset<{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>,
) => {
  setLoading(true);
  setServerError("");
  setShowBlur(true);
  setServerSuccess("");
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
      {
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      },
      { withCredentials: true },
    );
    const { success, message } = response.data;
    if (!success) {
      setServerError(response.data.message);
      return;
    }
    setServerSuccess(message);
    reset();
    router.refresh();
  } catch (error) {
    if (error instanceof axios.AxiosError) {
      const message: unknown = error.response?.data?.message;
      setServerError(
        typeof message === "string" ? message : "حدث خطأ. تأكد من صحة بياناتك.",
      );
    } else {
      setServerError("حدث خطأ أثناء انشاء حسابك. حاول مرة أخرى.");
    }
  } finally {
    setLoading(false);
    setShowBlur(false);
  }
};
