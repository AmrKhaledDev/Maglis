import { RegisterSchema } from "@/schemas/Auth/Register.schema";
import { FieldErrors } from "react-hook-form";
import z from "zod";
// ===================================================================
export const RegisterFields = (
  loading: boolean,
  errors?: FieldErrors<z.infer<typeof RegisterSchema>>,
) => {
  return [
    {
      placeholder: "اكتب اسمك",
      id: "name",
      label: "الاسم",
      disabled: loading,
      error: errors?.name?.message,
      type: "text",
    },
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
      type: "password",
      id: "password",
      label: "كلمة المرور",
      disabled: loading,
      error: errors?.password?.message,
    },
  ];
};
