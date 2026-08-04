import { Gender } from "@prisma/client";
import { LucideIcon, Mars, Venus } from "lucide-react";
// ==============================================
export const genderOptions: {
  id: string;
  value: Gender;
  label: string;
  icon: LucideIcon;
  iconColor: string;
}[] = [
  {
    id: "male",
    value: "MALE",
    label: "ذكر",
    icon: Mars,
    iconColor: "text-sky-500 bg-sky-100",
  },
  {
    id: "female",
    value: "FEMALE",
    label: "أنثى",
    icon: Venus,
    iconColor: "text-red-500 bg-red-100",
  },
];
