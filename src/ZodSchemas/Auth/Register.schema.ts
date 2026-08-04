import z from "zod";
// =================================================
export const RegisterSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "الاسم مطلوب" })
    .min(5, { message: "الاسم قصير للغاية" })
    .max(40, { message: "الاسم طويل للغاية" }),
  email: z
    .string({
      message: "البريد الإلكتروني غير صالح.",
    })
    .nonempty({ message: "البريد الإلكتروني مطلوب." })
    .min(5, {
      message: "البريد الإلكتروني قصير للغاية.",
    })
    .max(254, {
      message: "البريد الإلكتروني تجاوز الحد المسموح به.",
    })
    .email({
      message: "يرجى إدخال بريد إلكتروني صالح.",
    })
    .trim()
    .toLowerCase(),

  password: z
    .string({
      message: "كلمة المرور يجب أن تكون نصًا.",
    })
    .nonempty({ message: "كلمة المرور مطلوبة." })
    .min(8, {
      message: "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل.",
    })
    .max(64, {
      message: "كلمة المرور طويلة للغاية.",
    }),
});
