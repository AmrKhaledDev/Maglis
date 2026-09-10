import { DeleteMessageAction } from "@/actions/Conversation/DeleteMessage.action";
import { useActiveModal } from "@/providers/ActiveModalProvider";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// ========================================================================
function DeleteMessageAlert({
  messageId,
  receiverId,
}: {
  messageId: string;
  receiverId: string;
}) {
  const { setActiveModal } = useActiveModal();
  const userSession = useUser();
  const queryClient = useQueryClient();
  const { setToast } = useToast();
  const { mutate, isPending } = useMutation({
    mutationFn: async (deleteType: "DELETE BY SENDER" | "DELETE FOR ALL") => {
      const result = await DeleteMessageAction(messageId, deleteType);
      if (!result.success) throw new Error(result.message);
      return result.message;
    },
    onSuccess: (resultMessage) => {
      queryClient.invalidateQueries({
        queryKey: ["conversation", userSession.id, receiverId],
      });
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
      <div className="bg-black w-120 flex flex-col items-center justify-center p-5 rounded-2xl ring ring-white/5 gap-10">
        <h2 className="text-2xl">هل أنت متأكد من حذف الرسالة؟</h2>
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

export default DeleteMessageAlert;
