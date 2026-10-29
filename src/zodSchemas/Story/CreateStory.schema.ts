import z from "zod";
// ======================================
export const CreateStorySchema = z
  .object({
    media: z.string().optional().nullable(),
    contentText: z
      .string()
      .max(500, {
        message: "المحتوى النصي طويل للغاية يجب ألا يزيد عن 500 حرف.",
      })
      .trim()
      .optional()
      .nullable(),
    mediaType: z.string().optional().nullable(),
    color: z.string().optional().nullable(),
  })
  .superRefine((data, ctx) => {
    if (!data.media && !data.contentText) {
      ctx.addIssue({
        message: "لا يمكنك إنشاء حالة فارغة.",
        code: "custom",
      });
    }
    if (data.contentText && !data.color) {
      ctx.addIssue({
        code: "custom",
        message: "برجاء إختيار لون.",
      });
    }
  });
