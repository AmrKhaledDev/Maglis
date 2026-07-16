import { MediaType } from "@prisma/client";
import { LucideIcon } from "lucide-react";
// ======================================
export type EditPostModalFormType = {
  content: string;
  commentsDisabled: boolean;
  isPinnedToProfile: boolean;
  privacy: {
    icon: LucideIcon;
    value: string;
    label: string;
  };
  media: {
    preview: string;
    type: MediaType;
    file: File | null;
  }[];
};
