import z from "zod";
// =======================================
export const CreatePostSchema = z
  .object({
    content: z
      .string({ message: "المحتوى النصي للمنشور يجب أن يكون نصاً" })
      .trim()
      .optional(),
    media: z.any().nullable().optional(),
    privacy: z.string().nonempty({ message: "برجاء إختيار خصوصية للمنشور" }),
  })
  .superRefine((data, ctx) => {
    if (!data.content && (!data.media || data.media.length < 1)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "لا يمكنك إنشاء منشور فارغ.",
      });
    }
  });
