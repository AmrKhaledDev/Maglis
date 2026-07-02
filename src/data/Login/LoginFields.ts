import { LoginSchema } from "@/schemas/Auth/Login.schema";
import { Dispatch, SetStateAction } from "react";
import { FieldErrors } from "react-hook-form";
import z from "zod";
// =========================================================
export const LoginFields = (
  loading: boolean,
  showPassword: boolean,
  setShowPassword: Dispatch<SetStateAction<boolean>>,
  errors?: FieldErrors<z.infer<typeof LoginSchema>>,
) => {
  return [
    {
      placeholder: "أكتب بريدك الإلكتروني",
      type: "email",
      id: "email",
      label: "البريد الإلكتروني",
      isPasswordFiled: false,
      disabled: loading,
      error: errors?.email?.message,
    },
    {
      placeholder: "أدخل كلمة المرور الخاصة بحسابك",
      type: showPassword ? "text" : "password",
      id: "password",
      label: "كلمة المرور",
      isPasswordFiled: true,
      setShowPassword: setShowPassword,
      showPassword: showPassword,
      disabled: loading,
      error: errors?.password?.message,
    },
  ];
};
