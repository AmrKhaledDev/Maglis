import { Images, LucideIcon, MessageSquareOff, Pin } from "lucide-react";
import { IconType } from "react-icons/lib";
// =====================================================================
type PostSettings = {
  enabledLabel: string;
  disabledLabel: string;
  type: "showMediaInProfile" | "isPinnedToProfile" | "commentsDisabled";
  Icon: LucideIcon | IconType;
};

export const postSettings: PostSettings[] = [
  {
    enabledLabel: "إلغاء التثبيت من الملف الشخصي",
    disabledLabel: "تثبيت في الملف الشخصي",
    type: "isPinnedToProfile",
    Icon: Pin,
  },
  {
    enabledLabel: "السماح بالتعليقات",
    disabledLabel: "إيقاف التعليقات",
    type: "commentsDisabled",
    Icon: MessageSquareOff,
  },
  {
    enabledLabel: "إخفاء الوسائط",
    disabledLabel: "إظهار الوسائط",
    type: "showMediaInProfile",
    Icon: Images,
  },
] as const;
