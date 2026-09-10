import { useActiveMenu } from "@/providers/ActiveMenuProvider";
import { Comment, Post } from "@prisma/client";
import clsx from "clsx";
import { motion } from "framer-motion";
import { Ellipsis } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import CopyCommentContentButton from "./ButtonsOptions/CopyCommentContentButton";
import DeleteCommentButton from "./ButtonsOptions/DeleteCommentButton";
import EditCommentButton from "./ButtonsOptions/EditCommentButton";
import PinnedCommentButton from "./ButtonsOptions/PinnedCommentButton";
// ===============================================================================
function CommentOptions({
  comment,
  setCurrentComment,
  post,
}: {
  comment: Comment;
  setCurrentComment: Dispatch<SetStateAction<Comment | null>>;
  post: Post;
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
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bgOptionsBox boxMenu rounded-lg w-30"
        >
          <EditCommentButton
            comment={comment}
            setCurrentComment={setCurrentComment}
          />
          <PinnedCommentButton
            comment={comment}
            loading={publicLoading}
            setLoading={setPublicLoading}
            post={post}
          />
          <CopyCommentContentButton
            comment={comment}
            loading={publicLoading}
            setLoading={setPublicLoading}
          />
          <DeleteCommentButton
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
