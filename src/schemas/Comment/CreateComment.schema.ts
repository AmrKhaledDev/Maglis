import z from "zod";
// ==================
export const CreateCommentSchema = z
  .object({
    content: z
      .string()
      .trim()
      .max(150, { message: "محتوى التعليق كبير للغاية." })
      .optional()
      .nullable(),
    imageUrl: z.string().trim().optional().nullable(),
  })
  .superRefine((data, ctx) => {
    if (!data.content && !data.imageUrl) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "لا يمكنك إنشاء تعليق فارغ.",
      });
    }
  });
