import {
  Contact,
  ContactRound,
  Home,
  Layers,
  MessageCircle,
  Network,
  Search,
  Settings,
  User,
  Users,
  UsersRound,
} from "lucide-react";
// ===============================================================================================
export const navLinks = [
  {
    id: "home",
    icon: Home,
    href: "/",
    title: "الصفحة الرئيسية",
  },
  {
    id: "search",
    icon: Search,
    href: "",
    title: "البحث عن مستخدمين",
  },
  {
    id: "chat",
    icon: MessageCircle,
    href: "",
    title: "التواصل مع الأصدقاء",
  },
  {
    id: "profile",
    icon: User,
    href: "/u/profile",
    title: "الملف الشخصي",
  },

 {
  id: "team",
  icon: Network,
  href: "",
  title: "شبكتك",
},
{
  id: "layers",
  icon: UsersRound,
  href: "",
  title: "المجموعات",
},
{
  id: "contact",
  icon: ContactRound,
  href: "",
  title: "مجموعاتي",
},
  {
    id: "settings",
    icon: Settings,
    href: "",
    title: "الإعدادات",
  },
];
