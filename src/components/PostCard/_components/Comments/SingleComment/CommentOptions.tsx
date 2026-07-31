import { Ellipsis, Pencil } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { motion } from "framer-motion";
import BtnDeleteComment from "../ButtonsOptions/BtnDeleteComment";
import BtnCopyContentTxt from "../ButtonsOptions/BtnCopyContentTxt";
import { Comment } from "@prisma/client";
import BtnPinnedComment from "../ButtonsOptions/BtnPinnedComment";
import { useActiveMenu } from "@/providers/ActiveMenuProvider";
// ===============================================================================
function CommentOptions({
  comment,
  setCurrentComment,
}: {
  comment: Comment;
  setCurrentComment: Dispatch<SetStateAction<Comment | null>>;
}) {
  const { activeMenu, setActiveMenu } = useActiveMenu();
  const [publicLoading, setPublicLoading] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() =>
          setActiveMenu((prev) => (prev === comment.id ? "" : comment.id))
        }
        className={`cursor-pointer text-slate-300 btnActiveMenu h-fit hover:bg-white/5 mytransition hover:shadow rounded-full p-0.5
          ${activeMenu === comment.id && "bg-white/5"}`}
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
          <button
            onClick={() => {
              setActiveMenu("");
              setCurrentComment(comment);
            }}
            className="flex items-center gap-2 text-xs hover:bg-white mytransition cursor-pointer"
          >
            <Pencil className="size-4" /> تعديل
          </button>
          <BtnPinnedComment
            comment={comment}
            loading={publicLoading}
            setLoading={setPublicLoading}
          />
          {comment.content && (
            <BtnCopyContentTxt
              content={comment.content}
              loading={publicLoading}
              setLoading={setPublicLoading}
            />
          )}
          <hr className=" border-zinc-700 opacity-5" />
          <BtnDeleteComment
            loading={publicLoading}
            setLoading={setPublicLoading}
            commentId={comment.id}
          />
        </motion.div>
      )}
    </div>
  );
}

export default CommentOptions;
