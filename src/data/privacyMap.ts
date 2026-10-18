import { FaGlobeAfrica } from "react-icons/fa";
import { HiUsers } from "react-icons/hi2";
import { IoLockClosedSharp } from "react-icons/io5";
// ==================================================
const privacyMap = {
  PUBLIC: {
    label: "عام",
    value: "PUBLIC",
    icon: FaGlobeAfrica,
  },
  PRIVATE: {
    label: "خاص",
    value: "PRIVATE",
    icon: IoLockClosedSharp,
  },
  FRIENDS: {
    label: "للأصدقاء",
    value: "FRIENDS",
    icon: HiUsers,
  },
};

export default privacyMap;
