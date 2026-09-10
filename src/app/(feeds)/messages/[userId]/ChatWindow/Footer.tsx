"use client";
import { CreateDirectConversationAction } from "@/actions/Conversation/CreateDirectConversation.action";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { CreateMessageSchema } from "@/ZodSchemas/Message/CreateMessage.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useFieldArray, useForm } from "react-hook-form";
import z from "zod";
import ButtonCreateMessage from "./ButtonCreateMessage";
import ChatFooterActions from "./FooterActions/FooterActions";
// =======================================================================
function Footer({ receiverId }: { receiverId: string }) {
  const { setToast } = useToast();
  const userSession = useUser();
  const {
    register,
    setValue,
    control,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(CreateMessageSchema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "media",
  });
  const queryClient = useQueryClient();
  const content = watch("content");
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof CreateMessageSchema>) => {
      const result = await CreateDirectConversationAction(
        receiverId,
        data.content,
      );
      if (!result.success) throw new Error(result.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["conversation", userSession.id, receiverId],
      });
      setValue("content", "");
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
  return (
    <div>
      <div className="px-5 flex items-center gap-2">
        {fields.map((field) => (
          <div key={field.id} className="relative size-25">
            <Image src={field.mediaUrl} alt="" fill className="object-cover" />
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSubmit(handleCreateMessage)}
        className="h-15 flex items-center gap-3 justify-center"
      >
        <ButtonCreateMessage content={content} isPending={isPending} />
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit(handleCreateMessage);
          }}
          {...register("content")}
          className="border border-white/3 shadow bg-[#242626] py-3 rounded-full w-[80%] px-5 outline-none"
          type="text"
          placeholder="أكتب رسالتك هنا. . ."
        />
        <ChatFooterActions fields={fields} append={append} />
      </form>
    </div>
  );
}

export default Footer;
