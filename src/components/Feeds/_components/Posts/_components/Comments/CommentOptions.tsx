import { Ellipsis, Pencil, Pin } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { motion } from "framer-motion";
import BtnDeleteComment from "./ButtonsOptions/BtnDeleteComment";
import BtnCopyContentTxt from "./ButtonsOptions/BtnCopyContentTxt";
import { Comment } from "@prisma/client";
import BtnPinnedComment from "./ButtonsOptions/BtnPinnedComment";
// ===========================================================
function CommentOptions({
  showOptions,
  setShowOptions,
  comment,
  setCurrentComment,
}: {
  showOptions: string;
  setShowOptions: Dispatch<SetStateAction<string>>;
  comment: Comment;
  setCurrentComment: Dispatch<SetStateAction<Comment | null>>;
}) {
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (!e.target.closest(".butonShowCommentOptions, .boxCommentOptions"))
          setShowOptions("");
      }
    };
    document.addEventListener("click", handle);
    return () => document.removeEventListener("click", handle);
  }, []);
  const [publicLoading, setPublicLoading] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() =>
          setShowOptions((prev) => (prev === comment.id ? "" : comment.id))
        }
        className={`cursor-pointer text-slate-300 h-fit hover:bg-white/5 mytransition hover:shadow butonShowCommentOptions rounded-full p-0.5
          ${showOptions === comment.id && "bg-white/5"}`}
      >
        <Ellipsis className="size-4" strokeWidth={1.5} />
      </button>
      {showOptions === comment.id && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bgOptionsBox boxCommentOptions rounded-lg w-30"
        >
          <button
            onClick={() => {
              setShowOptions("");
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
            setShowOptions={setShowOptions}
          />
          {comment.content && (
            <BtnCopyContentTxt
              content={comment.content}
              setShowOptions={setShowOptions}
              loading={publicLoading}
              setLoading={setPublicLoading}
            />
          )}
          <hr className=" border-zinc-700 opacity-5" />
          <BtnDeleteComment
            loading={publicLoading}
            setLoading={setPublicLoading}
            commentId={comment.id}
            setShowOptions={setShowOptions}
          />
        </motion.div>
      )}
    </div>
  );
}

export default CommentOptions;
