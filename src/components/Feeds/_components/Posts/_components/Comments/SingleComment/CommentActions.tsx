import { CreateLikeForComentAction } from "@/actions/LikeForComment/CreateLikeForComment.action";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { Heart, MessageCircleReply } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { CommentDbType } from "../../../../../../../types/Comment.type";
import { useRepliesState } from "@/providers/RepliesStateProvider";
// =======================================================
function CommentActions({ comment }: { comment: CommentDbType }) {
  const { setShowReplyComposer } = useRepliesState();
  const user = useUser();
  const [loading, setLoading] = useState(false);
  const { setToast } = useToast();
  const handleCreateLikeForComment = async () => {
    try {
      setLoading(true);
      const result = await CreateLikeForComentAction(comment.id);
      if (!result.success)
        return setToast({
          open: true,
          message: result.message || "حدث خطأ غير متوقع.",
          type: "error",
        });
    } catch (error) {
      console.error(error);
      setToast({
        open: true,
        message: "حدث خطأ غير متوقع.",
        type: "error",
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };
  const isLikerForComment = comment.likeForComments.some(
    (like) => like.userId === user.id,
  );
  return (
    <div className="flex items-center gap-2">
      <button
        disabled={loading}
        onClick={handleCreateLikeForComment}
        className="cursor-pointer"
      >
        <Heart
          strokeWidth={1.5}
          className={`postBtnActIcon disabled:cursor-default ${isLikerForComment && "fill-red-500 text-red-500"}`}
        />
      </button>
      <button
        onClick={() =>
          setShowReplyComposer((prev) =>
            prev === comment.id ? "" : comment.id,
          )
        }
        disabled={loading}
        className="not-disabled:cursor-pointer"
      >
        <MessageCircleReply strokeWidth={1.5} className="postBtnActIcon" />
      </button>
    </div>
  );
}

export default CommentActions;
