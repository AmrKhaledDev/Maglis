import { formatLikes } from "@/formats/formatLikes";
import { formatReplies } from "@/formats/formatReplies";
import { CommentDbType } from "@/types/Comment.type";
import { Heart, MessageCircleReply } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
// ====================================================
function ReplyActions({
  setShowReplyComposer,
  reply,
}: {
  setShowReplyComposer: Dispatch<SetStateAction<string>>;
  reply: CommentDbType;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <button className="cursor-pointer">
          <Heart
            strokeWidth={1.5}
            className={`size-3.5 disabled:cursor-default`}
          />
        </button>
        <button
          onClick={() =>
            setShowReplyComposer((prev) => (prev === reply.id ? "" : reply.id))
          }
          className="not-disabled:cursor-pointer"
        >
          <MessageCircleReply strokeWidth={1.5} className="size-3.5" />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-[10px] text-slate-300">
          {formatLikes(reply.likeForComments.length)}
        </p>
        <p className="text-[10px] text-slate-300">
          {formatReplies(reply._count.replies)}
        </p>
      </div>
    </div>
  );
}

export default ReplyActions;
