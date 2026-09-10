import { useActiveMenu } from "@/providers/ActiveMenuProvider";
import { CommentType } from "@/types/Comment.type";
import clsx from "clsx";
import { motion } from "framer-motion";
import { Ellipsis } from "lucide-react";
import CopyReplyContentButton from "./ButtonsOptions/CopyReplyContentButton";
import DeleteReplayButton from "./ButtonsOptions/DeleteReplayButton";
import EditReplayButton from "./ButtonsOptions/EditReplayButton";
import FeaturedReplyButton from "./ButtonsOptions/FeaturedReplyButton";
// ==================================================================
function ReplyOptions({ reply }: { reply: CommentType }) {
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
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bgOptionsBox rounded-lg w-28 boxMenu"
        >
          <EditReplayButton reply={reply} />
          <CopyReplyContentButton reply={reply} />
          <FeaturedReplyButton reply={reply} />
          <DeleteReplayButton reply={reply} />
        </motion.div>
      )}
    </div>
  );
}

export default ReplyOptions;
