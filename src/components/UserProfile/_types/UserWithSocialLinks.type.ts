import { components } from "@/types/api";
// =============================================================
export type UserWithSocialLinks = Omit<
  components["schemas"]["UserWithSocialLinksDto"],
  | "image"
  | "cover"
  | "bio"
  | "username"
  | "gender"
  | "nickname"
  | "banExpiresAt"
  | "banReason"
  | "education"
  | "jobTitle"
  | "city"
> & {
  image: string | null;
  cover: string | null;
  bio: string | null;
  username: string | null;
  gender: "MALE" | "FEMALE" | null;
  nickname: string | null;
  banExpiresAt: string | null;
  banReason: string | null;
  education: string | null;
  jobTitle: string | null;
  city: string | null;
};
