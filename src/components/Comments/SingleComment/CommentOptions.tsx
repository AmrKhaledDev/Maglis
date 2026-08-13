import { Ellipsis } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { motion } from "framer-motion";
import { Comment } from "@prisma/client";
import { useActiveMenu } from "@/providers/ActiveMenuProvider";
import PinnedCommentBtn from "./ButtonsOptions/PinnedCommentBtn";
import DeleteCommentBtn from "./ButtonsOptions/DeleteCommentBtn";
import CopyCommentContentBtn from "./ButtonsOptions/CopyCommentContentBtn";
import EditCommentBtn from "./ButtonsOptions/EditCommentBtn";
import clsx from "clsx";
// ===============================================================================
function CommentOptions({
  comment,
  setCurrentComment,
  postAuthorId
}: {
  comment: Comment;
  setCurrentComment: Dispatch<SetStateAction<Comment | null>>;
  postAuthorId:string
}) {
  const { activeMenu, setActiveMenu } = useActiveMenu();
  const [publicLoading, setPublicLoading] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() =>
          setActiveMenu((prev) => (prev === comment.id ? "" : comment.id))
        }
        className={clsx(
          "cursor-pointer text-slate-300 btnActiveMenu h-fit hover:bg-white/5 mytransition hover:shadow rounded-full p-0.5",
          activeMenu === comment.id && "bg-white/5",
        )}
      >
        <Ellipsis className="size-4" strokeWidth={1.5} />
      </button>
      {activeMenu === comment.id && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bgOptionsBox boxMenu rounded-lg w-30"
        >
          <EditCommentBtn
            comment={comment}
            setCurrentComment={setCurrentComment}
          />
          <PinnedCommentBtn
            comment={comment}
            loading={publicLoading}
            setLoading={setPublicLoading}
            postAuthorId={postAuthorId}
          />
          <CopyCommentContentBtn
            comment={comment}
            loading={publicLoading}
            setLoading={setPublicLoading}
          />
          <DeleteCommentBtn
            loading={publicLoading}
            setLoading={setPublicLoading}
            comment={comment}
          />
        </motion.div>
      )}
    </div>
  );
}

export default CommentOptions;
