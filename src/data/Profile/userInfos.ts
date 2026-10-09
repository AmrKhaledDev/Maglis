import { User } from "@prisma/client";
import { Briefcase } from "lucide-react";
import { FcGraduationCap } from "react-icons/fc";
import { MdLocationPin } from "react-icons/md";
import { genderMap } from "../genderMap";
import { HiMiniBriefcase } from "react-icons/hi2";

// =====================================================
export const infos = (user: User) => {
  const gender = user.gender && genderMap[user.gender];
  return [
    {
      id: "location",
      label: "يقيم في",
      value: user.city,
      icon: MdLocationPin,
    },
    {
      id: "jobTitle",
      label: "يعمل",
      value: user.jobTitle,
      icon: HiMiniBriefcase,
    },
    {
      id: "education",
      label: "التعليم",
      value: user.education,
      icon: FcGraduationCap,
    },
    {
      id: "gender",
      label: "الجنس",
      value: gender?.label,
      icon: gender?.icon,
    },
  ];
};
