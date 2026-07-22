"use client";
import { Ellipsis } from "lucide-react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { motion } from "framer-motion";
import { PostDBType } from "@/types/PostDB.type";
import PostOwnerOptions from "./PostOwnerOptions";
import PostViewerOptions from "./PostViewerOptions";
import OptionsSavePostBtn from "./OptionsSavePostBtn";
import OptionsCopyLinkBtn from "./OptionsCopyLinkBtn";
// ===========================================================
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
        if (!e.target.closest(".buttonOptions, .boxOptions, .button"))
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
          className="bgOptionsBox boxOptions"
        >
          <PostOwnerOptions post={post} setShowOptions={setShowOptions} />
          <PostViewerOptions post={post} />
          <hr className=" border-zinc-700 opacity-5" />
          <OptionsSavePostBtn post={post} />
          <OptionsCopyLinkBtn setShowOptions={setShowOptions} post={post} />
        </motion.div>
      )}
    </div>
  );
}

export default PostOptions;
