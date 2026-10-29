import z from "zod";
// =========================================
export const CreateMessageSchema = z
  .object({
    content: z.string().trim().optional(),
    media: z
      .array(
        z.object({
          type: z.enum(["IMAGE", "VIDEO", "PDF"]),
          url: z.string().url(),
          name: z.string(),
          size: z.number(),
          file: z.file().optional().nullable(),
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
