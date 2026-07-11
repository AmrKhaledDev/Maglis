import { Globe, Lock, Users } from "lucide-react";
// =========================================================
export const privacyOptions = [
    {
      value: "PUBLIC",
      label: "عام",
      icon: Globe,
    },
    {
      value: "FRIENDS",
      label: "الأصدقاء",
      icon: Users,
    },
    {
      value: "PRIVATE",
      label: "خاص",
      icon: Lock,
    },
  ];