import { SocialPlatform } from "@prisma/client";
// ============================================
export const SOCIAL_PLATFORMS = [
  {
    formKey: "facebook",
    platform: SocialPlatform.FACEBOOK,
  },
  {
    formKey: "github",
    platform: SocialPlatform.GITHUB,
  },
  {
    formKey: "x",
    platform: SocialPlatform.X,
  },
  {
    formKey: "linkedIn",
    platform: SocialPlatform.LINKEDIN,
  },
  {
    formKey: "instagram",
    platform: SocialPlatform.INSTAGRAM,
  },
];
