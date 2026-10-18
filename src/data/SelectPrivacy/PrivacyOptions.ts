import { FaGlobeAfrica } from "react-icons/fa";
import { HiUsers } from "react-icons/hi2";
import { IoLockClosedSharp } from "react-icons/io5";
// =========================================================
export const privacyOptions = [
  {
    value: "PUBLIC",
    label: "عام",
    icon: FaGlobeAfrica,
  },
  {
    value: "FRIENDS",
    label: "الأصدقاء",
    icon: HiUsers,
  },
  {
    value: "PRIVATE",
    label: "خاص",
    icon: IoLockClosedSharp,
  },
] as const;
