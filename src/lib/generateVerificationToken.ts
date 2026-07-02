"use server";

import { createHash, randomUUID } from "crypto";
import { prisma } from "./prisma";
// =====================================================================
export const generateVerificationToken = async (
  email: string,
): Promise<{ error: string } | { token: string }> => {
  try {
    if (!email || email.trim().length < 1)
      return { error: "حدث خطأ غير متوقع حاول مره أُخرى" };
    const token = randomUUID();
    const hashingToken = createHash("sha256").update(token).digest("hex");
    await prisma.$transaction(async (tx) => {
      await tx.verificationToken.deleteMany({
        where: {
          identifier: email.toLowerCase(),
        },
      });
      await tx.verificationToken.create({
        data: {
          identifier: email,
          token: hashingToken,
          expires: new Date(Date.now() + 15 * 60 * 1000),
        },
      });
    });
    return { token };
  } catch (error) {
    console.log(error);
    return { error: "حدث خطأ أثناء انشاء رمز التحقق الخاص بك" };
  }
};
