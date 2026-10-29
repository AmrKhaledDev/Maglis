import { Gender } from "@prisma/client";
import { z } from "zod";
// =====================
const usernameRegex =
  /^(?=.{3,30}$)(?!.*[_.]{2})[a-z0-9](?:[a-z0-9._]*[a-z0-9])?$/;

const optionalString = (max = 100) =>
  z
    .string()
    .trim()
    .max(max, `يجب ألا يتجاوز هذا الحقل ${max} حرفًا.`)
    .optional()
    .or(z.literal(""));

const facebook = z
  .string()
  .trim()
  .regex(
    /^https?:\/\/(www\.)?facebook\.com\/.+$/i,
    "يرجى إدخال رابط حساب فيسبوك صحيح.",
  )
  .optional()
  .or(z.literal(""));

const x = z
  .string()
  .trim()
  .regex(
    /^https?:\/\/(www\.)?(x|twitter)\.com\/.+$/i,
    "يرجى إدخال رابط حساب X (تويتر) صحيح.",
  )
  .optional()
  .or(z.literal(""));

const linkedIn = z
  .string()
  .trim()
  .regex(
    /^https?:\/\/(www\.)?linkedin\.com\/.+$/i,
    "يرجى إدخال رابط حساب LinkedIn صحيح.",
  )
  .optional()
  .or(z.literal(""));

const instagram = z
  .string()
  .trim()
  .regex(
    /^https?:\/\/(www\.)?instagram\.com\/.+$/i,
    "يرجى إدخال رابط حساب Instagram صحيح.",
  )
  .optional()
  .or(z.literal(""));

const github = z
  .string()
  .trim()
  .regex(
    /^https?:\/\/(www\.)?github\.com\/.+$/i,
    "يرجى إدخال رابط حساب GitHub صحيح.",
  )
  .optional()
  .or(z.literal(""));

export const EditProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "الاسم يجب أن يتكون من حرفين على الأقل.")
    .max(50, "الاسم يجب ألا يتجاوز 50 حرفًا."),

  nickname: optionalString(30),

  username: z
    .string()
    .trim()
    .toLowerCase()
    .min(3, "اسم المستخدم يجب أن يتكون من 3 أحرف على الأقل.")
    .max(30, "اسم المستخدم يجب ألا يتجاوز 30 حرفًا.")
    .regex(
      usernameRegex,
      "اسم المستخدم غير صالح. استخدم أحرفًا إنجليزية صغيرة وأرقامًا و(_) أو (.) فقط.",
    ),

  bio: optionalString(160),

  jopTitle: optionalString(60),

  education: optionalString(100),

  professionalMode: z.boolean(),

  gender: z.enum([Gender.MALE, Gender.FEMALE]).optional().or(z.literal("")),

  city: optionalString(20),

  facebook,
  x,
  linkedIn,
  instagram,
  github,
});
