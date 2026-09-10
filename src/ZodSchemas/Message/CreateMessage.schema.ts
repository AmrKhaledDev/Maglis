import { MediaType } from "@prisma/client";
import z from "zod";
// =========================================
export const CreateMessageSchema = z
  .object({
    content: z.string().trim().optional(),
    media: z
      .array(
        z.object({
          mediaType: z.enum(["IMAGE", "VIDEO", "PDF"]),
          mediaUrl: z.string().url(),
          file: z.file(),
        }),
      )
      .nullable()
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.content && (!data.media || data.media.length < 1)) {
      ctx.addIssue({
        code: "custom",
        message: "لا يمكنك إرسال رسالة فارغة.",
      });
    }
  });
