import { User } from "@prisma/client";
import { FcGraduationCap } from "react-icons/fc";
import { HiMiniBriefcase } from "react-icons/hi2";
import { MdLocationPin } from "react-icons/md";
import { genderMap } from "./genderMap";
import { UserSearchResultType } from "@/types/UserSearchResult.type";

// =====================================================
export const infos = (user: User | UserSearchResultType) => {
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
