"use client";
import { Ellipsis } from "lucide-react";
import { useActiveMenu } from "@/providers/ActiveMenuProvider";
import { clsx } from "clsx";
import { PostType } from "@/types/Post.type";
import PostOptionsBox from "./PostOptionsBox";
// ===========================================================
function PostOptions({ post }: { post: PostType }) {
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
      <PostOptionsBox activeMenu={activeMenu} post={post} />
    </div>
  );
}

export default PostOptions;
