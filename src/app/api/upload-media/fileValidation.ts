import z from "zod";
import allowedFileTypes from "./allowedFileTypes";
// =======================================================
const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const MAX_PDF_SIZE = 10 * 1024 * 1024;
const MAX_VIDEO_SIZE = 100 * 1024 * 1024;
const fileValidation = (
  file: File | any,
): {
  success: boolean;
  message?: string;
  fileType?: "image" | "video" | "pdf";
  file?: File;
} => {
  if (!file || !(file instanceof File))
    return { success: false, message: "برجاء رفع ملف صالح" };
  if (!allowedFileTypes.includes(file.type))
    return { success: false, message: "عذراً هناك ملف غير مدعوم." };
  const fileType = file.type.startsWith("video/")
    ? "video"
    : file.type.startsWith("image/")
      ? "image"
      : "pdf";
  const validation = z
    .object({
      fileType: z.enum(["video", "image", "pdf"]),
    })
    .superRefine((data, ctx) => {
      if (data.fileType === "video" && file.size > MAX_VIDEO_SIZE) {
        ctx.addIssue({
          code: "custom",
          message: "لا يمكنك رفع فيديو يتخطى 100 ميجابايت.",
        });
      }
      if (data.fileType === "image" && file.size > MAX_IMAGE_SIZE) {
        ctx.addIssue({
          code: "custom",
          message: "لا يمكنك رفع صورة يتجاوز حجمها 10 ميجابايت.",
        });
      }
      if (data.fileType === "pdf" && file.size > MAX_PDF_SIZE) {
        ctx.addIssue({
          code: "custom",
          message: "لا يمكنك رفع ملف يتجاوز حجمه 10 ميجابايت.",
        });
      }
    })
    .safeParse({ fileType });
  if (!validation.success)
    return { success: false, message: validation.error.issues[0].message };
  else return { success: true, fileType, file };
};

export default fileValidation;
