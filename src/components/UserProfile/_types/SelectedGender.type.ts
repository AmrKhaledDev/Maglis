import { Gender } from "@prisma/client";
import { LucideIcon } from "lucide-react";
// =======================================
export type SelectedGenderType = {
  icon: LucideIcon;
  value: Gender;
  label: string;
} | null;
