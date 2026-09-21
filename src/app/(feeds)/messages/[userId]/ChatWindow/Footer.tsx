"use client";
import { CreateDirectConversationAction } from "@/actions/Conversation/CreateDirectConversation.action";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { CreateMessageSchema } from "@/ZodSchemas/Message/CreateMessage.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import z from "zod";
import FooterMediaType from "../_types/FooterMedia.type";
import ButtonCreateMessage from "./ButtonCreateMessage";
import FooterActions from "./FooterActions/FooterActions";
// =======================================================================
function Footer({ receiverId }: { receiverId: string }) {
  const { setToast } = useToast();
  const userSession = useUser();
  const methods = useForm({
    resolver: zodResolver(CreateMessageSchema),
  });
  const { register, handleSubmit, watch, control, setValue } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "media",
  });
  const queryClient = useQueryClient();
  const content = watch("content");
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof CreateMessageSchema>) => {
      let media: FooterMediaType[] = [];
      if (fields.length > 0) {
        const data = await Promise.all(
          fields.map(async (field) => {
            try {
              if (!field.file) return null;
              const formData = new FormData();
              formData.append("file", field.file);
              const res = await axios.post("/api/upload-media", formData);
              const data: FooterMediaType = res.data;
              return data;
            } catch (error) {
              console.error(error);
              if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data.error);
              }
              throw new Error(
                "حدث خطأ أثناء رفع ملفاتك برجاء التأكد من الإتصال بالإنترنت وأعد المحاولة.",
              );
            }
          }),
        );
        media = data.filter((field) => field !== null);
      }
      const result = await CreateDirectConversationAction(
        receiverId,
        data.content,
        media,
      );
      if (!result.success) throw new Error(result.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["conversation", userSession.id, receiverId],
      });
      setValue("content", "");
      remove();
    },
    onError: (err: Error) => {
      setToast({
        open: true,
        message: err.message,
        type: "error",
      });
    },
  });
  const handleCreateMessage = (data: z.infer<typeof CreateMessageSchema>) => {
    mutate(data);
  };
  const messageInputRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...contentRegister } = register("content");
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(handleCreateMessage)}
        className="py-2 flex items-center gap-3 justify-center px-2"
      >
        <ButtonCreateMessage content={content} isPending={isPending} />
        {fields.length < 1 && (
          <input
            dir={watch("content") ? "auto" : ""}
            {...contentRegister}
            ref={(element) => {
              ref(element);
              messageInputRef.current = element;
            }}
            className="border border-white/3 shadow bg-[#242626] py-3 rounded-full flex-1 px-5 outline-none"
            type="text"
            placeholder="أكتب رسالتك هنا. . ."
          />
        )}
        <FooterActions
          fields={fields}
          append={append}
          remove={remove}
          messageInputRef={messageInputRef}
          isPending={isPending}
        />
      </form>
    </FormProvider>
  );
}

export default Footer;
