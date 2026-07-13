import { Ellipsis } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { motion } from "framer-motion";
import SavePostBtn from "./_components/SavePostBtn";
import { PostDBType } from "@/types/PostDBType";
import CopyLinkBtn from "./_components/CopyLinkBtn";
import PostOwnerOptions from "./_components/PostOwnerOptions/PostOwnerOptions";
import PostViewerOptions from "./_components/PostViewerOptions/PostViewerOptions";
// =================================================
function PostOptions({
  showOptions,
  setShowOptions,
  post,
}: {
  showOptions: string;
  setShowOptions: Dispatch<SetStateAction<string>>;
  post: PostDBType;
}) {
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (!e.target.closest(".buttonOptions, .boxOptions"))
          setShowOptions("");
      }
    };
    document.addEventListener("click", handle);
    return () => document.removeEventListener("click", handle);
  });
  return (
    <div className="absolute top-1 left-1 ">
      <button
        onClick={() =>
          setShowOptions((prev) => (prev == post.id ? "" : post.id))
        }
        className={`cursor-pointer mytransition buttonOptions hover:shadow p-1 rounded-full hover:bg-white/5
          ${showOptions === post.id && "bg-white/5"}
          `}
      >
        <Ellipsis className="size-5" />
      </button>
      {showOptions === post.id && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="p-3 shadow-2xl flex boxOptions flex-col gap-2 absolute bg-gray-200 text-slate-900 rounded-2xl w-fit whitespace-nowrap z-9 left-0 font-semibold"
        >
          <PostOwnerOptions post={post} setShowOptions={setShowOptions} />
          <PostViewerOptions post={post} />
          <SavePostBtn post={post} />
          <CopyLinkBtn setShowOptions={setShowOptions} post={post} />
        </motion.div>
      )}
    </div>
  );
}

export default PostOptions;
