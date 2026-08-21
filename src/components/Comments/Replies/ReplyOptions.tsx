import { Ellipsis } from "lucide-react";
import { motion } from "framer-motion";
import { useActiveMenu } from "@/providers/ActiveMenuProvider";
import { CommentType } from "@/types/Comment.type";
import DeleteReplayBtn from "./ButtonsOptions/DeleteReplayBtn";
import CopyContentBtn from "./ButtonsOptions/CopyContentBtn";
import FeaturedReplyBtn from "./ButtonsOptions/FeaturedReplyBtn";
import EditReplayBtn from "./ButtonsOptions/EditReplayBtn";
import clsx from "clsx";
// ==================================================================
function ReplyOptions({
  reply,
  commentId,
}: {
  reply: CommentType;
  commentId: string;
}) {
  const { activeMenu, setActiveMenu } = useActiveMenu();
  return (
    <div className="relative">
      <button
        onClick={() => setActiveMenu(reply.id)}
        className={clsx(
          "cursor-pointer btnActiveMenu text-slate-300 h-fit hover:bg-white/5 mytransition hover:shadow butonShowCommentOptions rounded-full p-0.5",
          activeMenu === reply.id && "bg-white/5",
        )}
      >
        <Ellipsis className="size-3" strokeWidth={1.5} />
      </button>
      {activeMenu == reply.id && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bgOptionsBox rounded-lg w-28 boxMenu"
        >
          <EditReplayBtn reply={reply} />
          <CopyContentBtn reply={reply} />
          <FeaturedReplyBtn reply={reply} commentId={commentId} />
          <DeleteReplayBtn reply={reply} commentId={commentId}/>
        </motion.div>
      )}
    </div>
  );
}

export default ReplyOptions;
