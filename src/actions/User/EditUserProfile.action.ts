"use server";

import validateSession from "@/auth/validateSession";
import { prisma } from "@/lib/prisma";
import { EditProfileSchema } from "@/ZodSchemas/EditProfile/EditProfile.schema";
import { SocialPlatform } from "@prisma/client";
import { revalidateTag } from "next/cache";
import z from "zod";
// ==============================================================================
export const EditUserProfileAction = async (
  userId: string,
  data: z.infer<typeof EditProfileSchema>,
): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    if (!userId)
      return {
        success: false,
        message: "حدث خطأ غير متوقع أثناء تعديل بياناتك الشخصية",
      };
    const validation = EditProfileSchema.safeParse(data);
    if (!validation.success)
      return { success: false, message: validation.error.issues[0].message };
    const validatingSession = await validateSession();
    if (!validatingSession.session || !validatingSession.success)
      return {
        success: false,
        message: validatingSession.message || "حدث خطأ أثناء التحقق من حسابك.",
      };
    const session = validatingSession.session;
    if (userId !== session.id)
      return { success: false, message: "لا يمكنك تنفيذ هذا الإجراء." };
    const socialPlatformsLink: {
      link: string;
      platform: SocialPlatform;
    }[] = [
      { link: data.facebook, platform: "FACEBOOK" },
      { link: data.github, platform: "GITHUB" },
      { link: data.instagram, platform: "INSTAGRAM" },
      { link: data.linkedIn, platform: "LINKEDIN" },
      { link: data.x, platform: "X" },
    ].filter(
      (item): item is { link: string; platform: SocialPlatform } => !!item.link,
    );
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: data.name,
        nickname: data.nickname,
        bio: data.bio,
        username: data.username,
        gender: data.gender || null,
        professionalMode: data.professionalMode,
        education: data.education,
        jobTitle: data.jopTitle,
        city: data.city,
        socialLinks: {
          deleteMany: {},
          createMany: {
            data: socialPlatformsLink.map((item) => ({
              link: item.link,
              platform: item.platform,
            })),
          },
        },
      },
    });
    revalidateTag("posts", "");
    return { success: true, message: "تم تعديل بياناتك الشخصية بنجاح." };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "حدث خطأ أثناء تعديل بياناتك الخاص بك حاول مرة أخرى.",
    };
  }
};
