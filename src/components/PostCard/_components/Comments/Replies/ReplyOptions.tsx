import { Copy, Ellipsis, Pencil, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useActiveMenu } from "@/providers/ActiveMenuProvider";
import { useState } from "react";
import { useToast } from "@/providers/ToastProvider";
import { useRepliesState } from "@/providers/RepliesStateProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteCommentAction } from "@/actions/Comment/DeleteComment.action";
import { CommentType } from "@/types/Comment.type";
// ==================================================================
function ReplyOptions({ reply }: { reply: CommentType }) {
  const { setShowReplyComposer, setCurrentReply } = useRepliesState();
  const { activeMenu, setActiveMenu } = useActiveMenu();
  const { setToast } = useToast();
  const [loading, setLoading] = useState(false);
  const handleCopyContent = async () => {
    try {
      setLoading(true);
      await navigator.clipboard.writeText(reply.content || "");
      setToast({
        open: true,
        message: "تم نسخ المحتوى إلى الحافظة",
        duration: 2000,
        type: "success",
      });
      setActiveMenu("");
    } catch (error) {
      console.error(error);
      setToast({
        message: "حدث خطأ عند نسخ المحتوى.",
        open: true,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  const queryClient = useQueryClient();
  const { mutate: handleDeleteReply, isPending } = useMutation({
    mutationFn: async () => {
      const result = await DeleteCommentAction(reply.id);
      if (!result.success)
        throw new Error(
          result.message || "حدث خطأ أثناء حذف التعليق الخاص بك.",
        );
    },
    onSuccess: () => {
      setActiveMenu("");
      queryClient.invalidateQueries({
        queryKey: ["replies"],
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
    <div className="relative">
      <button
        onClick={() => setActiveMenu(reply.id)}
        className={`cursor-pointer btnActiveMenu text-slate-300 h-fit hover:bg-white/5 mytransition hover:shadow butonShowCommentOptions rounded-full p-0.5`}
      >
        <Ellipsis className="size-3" strokeWidth={1.5} />
      </button>
      {activeMenu == reply.id && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bgOptionsBox rounded-lg w-25 boxMenu"
        >
          <button
            onClick={() => {
              setShowReplyComposer(reply.id);
              setCurrentReply(reply);
            }}
            className="flex items-center gap-2 text-[11px] hover:bg-white mytransition cursor-pointer"
          >
            <Pencil className="size-4" /> تعديل
          </button>
          {reply.content && (
            <button
              onClick={handleCopyContent}
              disabled={loading}
              className="flex items-center gap-2 text-[11px] not-disabled:hover:bg-white mytransition not-disabled:cursor-pointer"
            >
              <Copy className="size-4" /> نسخ النص
            </button>
          )}
          <hr className=" border-zinc-700 opacity-8" />
          <button
            onClick={() => handleDeleteReply()}
            disabled={isPending}
            className="flex items-center gap-2 text-[11px] not-disabled:hover:bg-white mytransition not-disabled:cursor-pointer text-red-600"
          >
            <Trash2 className="size-4" /> حذف
          </button>
        </motion.div>
      )}
    </div>
  );
}

export default ReplyOptions;
