import { HiUserGroup } from "react-icons/hi2";
import { IoIosNotifications } from "react-icons/io";
import { PiVideoFill } from "react-icons/pi";
import { SiGoogleanalytics } from "react-icons/si";
// ===================================================
const headerNavItems = [
  {
    label: "التحليلات",
    href: "/analytics",
    icon: SiGoogleanalytics,
  },
  {
    label: "شبكتك",
    href: "/network",
    icon: HiUserGroup,
  },
  {
    label: "الفيديوهات",
    href: "/videos",
    icon: PiVideoFill,
  },
  {
    label: "الإشعارات",
    href: "/notification",
    icon: IoIosNotifications,
    badge: 1,
  },
];
export default headerNavItems;
