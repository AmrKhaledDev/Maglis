import { User } from "@prisma/client";
import { genderMap } from "../genderMap";
import { Briefcase, Globe, GraduationCap } from "lucide-react";
// =====================================================
export const infos = (user:User) => {
  const gender = user.gender && genderMap[user.gender];
  return [
    {
      id: "location",
      label: "يقيم في",
      value: user.city,
      icon: Globe,
    },
    {
      id: "jobTitle",
      label: "يعمل",
      value: user.jobTitle,
      icon: Briefcase,
    },
    {
      id: "education",
      label: "التعليم",
      value: user.education,
      icon: GraduationCap,
    },
    {
      id: "gender",
      label: "الجنس",
      value: gender?.label,
      icon: gender?.icon,
    },
  ];
};
