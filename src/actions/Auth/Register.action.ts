"use server";

import { registerSendVerificationToken } from "@/lib/email/registerSendVerificationToken";
import { generateVerificationToken } from "@/lib/generateVerificationToken";
import { prisma } from "@/lib/prisma";
import { RegisterSchema } from "@/schemas/Auth/Register.schema";
import bcrypt from "bcryptjs";
import z from "zod";
// =====================================================
export const RegisterAction = async (
  data: z.infer<typeof RegisterSchema>,
): Promise<{ success: boolean; message: string }> => {
  try {
    const validation = RegisterSchema.safeParse(data);
    if (!validation.success)
      return { success: false, message: validation.error.issues[0].message };
    const isExistingUser = await prisma.user.findUnique({
      where: {
        email: validation.data.email,
      },
      select: { id: true },
    });
    if (isExistingUser)
      return { success: false, message: "هذا المستخدم موجود بالفعل" };
    const verificationToken = await generateVerificationToken(
      validation.data.email,
    );
    if ("error" in verificationToken)
      return { success: false, message: verificationToken.error };
    try {
      await prisma.$transaction(async (tx) => {
        const result = await registerSendVerificationToken(
          validation.data.email,
          verificationToken.token,
          validation.data.name,
        );
        if (!result.success) throw new Error(result.message);
        const hashingPassword = await bcrypt.hash(validation.data.password, 12);
        await tx.user.create({
          data: {
            name: validation.data.name,
            email: validation.data.email,
            password: hashingPassword,
          },
        });
      });
    } catch (error) {
      console.log(error);
      return { success: false, message: "حدث خطأ أثناء حفظ البيانات" };
    }
    return {
      success: true,
      message: "تم إرسال رابط التحقق إلى البريد الإلكتروني",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "حدث خطأ أثناء انشاء حسابك حاول مره أُخرى",
    };
  }
};
