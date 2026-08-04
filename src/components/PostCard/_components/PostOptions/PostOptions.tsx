"use client";
import { Ellipsis } from "lucide-react";
import { motion } from "framer-motion";
import { PostDBType } from "@/types/Post.type";
import PostOwnerOptions from "./PostOwnerOptions";
import PostViewerOptions from "./PostViewerOptions";
import OptionsSavePostBtn from "./OptionsSavePostBtn";
import OptionsCopyLinkBtn from "./OptionsCopyLinkBtn";
import { useActiveMenu } from "@/providers/ActiveMenuProvider";
import { clsx } from "clsx";
// ===========================================================
function PostOptions({ post }: { post: PostDBType }) {
  const { activeMenu, setActiveMenu } = useActiveMenu();
  return (
    <div className="absolute top-1 left-1 ">
      <button
        onClick={() =>
          setActiveMenu((prev) => (prev == post.id ? "" : post.id))
        }
        className={clsx(
          "cursor-pointer mytransition btnActiveMenu hover:shadow p-1 rounded-full hover:bg-white/5",
          activeMenu === post.id && "bg-white/5",
        )}
      >
        <Ellipsis strokeWidth={0.5} className="size-5" />
      </button>
      {activeMenu === post.id && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bgOptionsBox boxMenu"
        >
          <PostOwnerOptions post={post} />
          <PostViewerOptions post={post} />
          <hr className=" border-zinc-700 opacity-5" />
          <OptionsSavePostBtn post={post} />
          <OptionsCopyLinkBtn post={post} />
        </motion.div>
      )}
    </div>
  );
}

export default PostOptions;
