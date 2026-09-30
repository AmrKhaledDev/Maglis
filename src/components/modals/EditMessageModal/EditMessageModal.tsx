import { MessageContentAction } from "@/actions/Conversation/MessageContentAction";
import { invalidateUserCaches } from "@/lib/invalidateUserCaches";
import { useActiveModal } from "@/providers/ActiveModalProvider";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { Message } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createPortal } from "react-dom";
import TextareaAutoSize from "react-textarea-autosize";
import ButtonCancel from "./ButtonCancel";
import ButtonDelete from "./ButtonDelete";
import ButtonSave from "./ButtonSave";
// ========================================================================================
function EditMessageModal({ message }: { message: Message }) {
  const userSession = useUser();
  const { setToast } = useToast();
  const { setActiveModal } = useActiveModal();
  const [newMessageContent, setNewMessageContent] = useState(
    message.content || "",
  );
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (type: "DELETE" | "EDIT") => {
      if (type === "EDIT" && !newMessageContent.trim())
        throw new Error("لا يمكنك إضافة محتوى فارغ.");
      const result = await MessageContentAction(
        message.id,
        newMessageContent,
        type,
      );
      if (!result.success) throw new Error(result.message);
      return result.message;
    },
    onSuccess: (message) => {
      invalidateUserCaches(queryClient, userSession);
      setToast({
        open: true,
        message,
        type: "success",
      });
      setActiveModal(null);
    },
    onError: (err: Error) => {
      setToast({
        open: true,
        message: err.message,
        type: "error",
      });
    },
  });
  return createPortal(
    <div className="fixed inset-0 bg-black/20 backdrop-blur-[3px] z-100 flex items-center justify-center">
      <div className="modalStyle flex flex-col gap-7">
        <h1 className="text-center  text-gray-200 font-light">تعديل الرسالة</h1>
        <div className="flex flex-col gap-2">
          <h2 className="text-sm">الرسالة الحالية :</h2>
          <TextareaAutoSize
            value={newMessageContent}
            onChange={(e) => setNewMessageContent(e.target.value)}
            minRows={5}
            maxRows={10}
            placeholder="اكتب رسالتك هنا..."
            className="border w-full font-light p-2 border-white/5 rounded-xl resize-none outline-none text-sm"
          />
        </div>
        <div className="flex items-center gap-3">
          <ButtonSave isPending={isPending} mutate={mutate} />
          <ButtonDelete
            isPending={isPending}
            mutate={mutate}
            newMessageContent={newMessageContent}
          />
          <ButtonCancel isPending={isPending} />
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default EditMessageModal;
