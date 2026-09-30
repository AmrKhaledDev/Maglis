import { ClearingMessagesAction } from "@/actions/Conversation/ClearingMessages.action";
import { invalidateUserCaches } from "@/lib/invalidateUserCaches";
import { useActiveMenu } from "@/providers/ActiveMenuProvider";
import { useActiveModal } from "@/providers/ActiveModalProvider";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPortal } from "react-dom";
// ====================================================================
function ClearingMessagesModal({ receiverId }: { receiverId: string }) {
  const { setActiveModal } = useActiveModal();
  const { setActiveMenu } = useActiveMenu();
  const { setToast } = useToast();
  const userSession = useUser();
  const queryClient = useQueryClient();
  const { mutate: handleClearingMessages, isPending } = useMutation({
    mutationFn: async () => {
      const result = await ClearingMessagesAction(receiverId);
      if (!result.success) throw new Error(result.message);
      return result.message;
    },
    onSuccess: (message: string) => {
      setToast({
        open: true,
        message: message,
        type: "success",
      });
      invalidateUserCaches(queryClient, userSession, receiverId);
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
    <div className="fixed inset-0 bg-black/10 backdrop-blur-[3px] z-100 flex items-center justify-center menuKeepOpen">
      <div className="modalStyle flex flex-col gap-10">
        <div className="flex flex-col items-center">
          <h1 className="text-xl">هل أنت متأكد من حذف هذه الرسائل؟</h1>
          <p className="text-gray-300 text-sm">
            لا يمكن التراجع عن هذا الإجراء بعد تأكيده.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <button
            disabled={isPending}
            onClick={() => {
              handleClearingMessages();
              setActiveModal(null);
              setActiveMenu(null);
            }}
            className="text-red-400 ring ring-white/8 mytransition w-full py-3 rounded-full not-disabled:cursor-pointer shadow"
          >
            مسح الرسائل
          </button>
          <button
            onClick={() => setActiveModal(null)}
            className="bg-black/20 hover:bg-black/30 mytransition w-full py-3 rounded-full cursor-pointer hover:shadow"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default ClearingMessagesModal;

// ["conversation", userSession.id, receiverId]
