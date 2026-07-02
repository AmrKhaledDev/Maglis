"use server";

import { signIn } from "@/lib/auth";
import { registerSendVerificationToken } from "@/lib/email/registerSendVerificationToken";
import { generateVerificationToken } from "@/lib/generateVerificationToken";
import { prisma } from "@/lib/prisma";
import { LoginSchema } from "@/schemas/Auth/Login.schema";
import bcrypt from "bcryptjs";
import z from "zod";
// =========================================================
export const LoginAction = async (
  data: z.infer<typeof LoginSchema>,
): Promise<{ success: boolean; message: string }> => {
  try {
    const validation = LoginSchema.safeParse(data);
    if (!validation.success)
      return { success: false, message: validation.error.issues[0].message };
    const existingUser = await prisma.user.findUnique({
      where: {
        email: validation.data.email,
      },
      select: { password: true, name: true, emailVerified: true },
    });
    if (!existingUser)
      return {
        success: false,
        message: "حسابك غير موجود برجاء إنشاء حساب جديد",
      };
    if (!existingUser.password)
      return { success: false, message: "برجاء تسجيل الدخول بإستخدام Google" };
    const checkPassword = await bcrypt.compare(
      validation.data.password,
      existingUser.password,
    );
    if (!checkPassword)
      return { success: false, message: "كلمة المرور غير صحيحة" };
    if (!existingUser.emailVerified) {
      const verificationToken = await generateVerificationToken(
        validation.data.email,
      );
      if ("error" in verificationToken)
        return { success: false, message: verificationToken.error };
      const result = await registerSendVerificationToken(
        validation.data.email,
        existingUser.name,
        verificationToken.token,
      );
      if (!result.success) return { success: false, message: result.message };
      return { success: true, message: result.message };
    }
    await signIn("credentials", {
      email: validation.data.email,
      password: validation.data.password,
    });
    return { success: false, message: "جاري تسجيل دخولك" };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "حدث خطأ أثناء تسجيل دخولك حاول مرة أخرى",
    };
  }
};
