import { Contact, Home, Layers, MessageCircle, Search, Settings, User, Users } from "lucide-react";
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
    href: "",
    title: "الملف الشخصي",
  },
  {
    id: "settings",
    icon: Settings,
    href: "",
    title: "الإعدادات",
  },
  {
    id: "team",
    icon: Users,
    href: "",
    title: "شبكتك",
  },
  {
    id: "layers",
    icon: Layers,
    href: "",
    title: "المجموعات",
  },
  {
    id: "contact",
    icon: Contact,
    href: "",
    title: "مجوعاتي",
  },
];
