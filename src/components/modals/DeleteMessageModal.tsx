import { DeleteMessageAction } from "@/actions/Conversation/DeleteMessage.action";
import { invalidateUserCaches } from "@/lib/invalidateUserCaches";
import { useActiveModal } from "@/providers/ActiveModalProvider";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { Message } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// ========================================================================
function DeleteMessageModal({
  message,
  receiverId,
}: {
  message: Message;
  receiverId: string;
}) {
  const { setActiveModal } = useActiveModal();
  const userSession = useUser();
  const queryClient = useQueryClient();
  const { setToast } = useToast();
  const { mutate, isPending } = useMutation({
    mutationFn: async (deleteType: "DELETE BY SENDER" | "DELETE FOR ALL") => {
      const result = await DeleteMessageAction(message.id, deleteType);
      if (!result.success) throw new Error(result.message);
      return result.message;
    },
    onSuccess: (resultMessage) => {
      invalidateUserCaches(queryClient, userSession, receiverId);
      setToast({
        open: true,
        message: resultMessage,
        type: "success",
      });
    },
    onError: (err: Error) => {
      setToast({
        open: true,
        message: err.message,
        type: "error",
      });
    },
  });
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-[3px] z-100 flex items-center justify-center">
      <div className="modalStyle flex flex-col items-center justify-center gap-10">
        <h2 className="text-xl">هل أنت متأكد من حذف الرسالة؟</h2>
        <div className="flex flex-col gap-2 w-full">
          <button
            disabled={isPending}
            onClick={() => {
              mutate("DELETE BY SENDER");
              setActiveModal(null);
            }}
            className="py-3 w-full rounded-full ring ring-white/10 not-disabled:cursor-pointer hover:bg-white/5"
          >
            نعم حذف لدي
          </button>
          {new Date(message.createdAt) >
            new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) && (
            <button
              disabled={isPending}
              onClick={() => {
                mutate("DELETE FOR ALL");
                setActiveModal(null);
              }}
              className="py-3 w-full rounded-full ring ring-white/10 text-red-500 not-disabled:cursor-pointer hover:bg-white/5"
            >
              نعم حذف لدى الجميع
            </button>
          )}
          <button
            onClick={() => setActiveModal(null)}
            className="py-3 w-full rounded-full hover:bg-green-800/20 cursor-pointer "
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteMessageModal;
