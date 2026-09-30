"use client";
import { useActiveMenu } from "@/providers/ActiveMenuProvider";
import { PostType } from "@/types/Post.type";
import { clsx } from "clsx";
import { Ellipsis } from "lucide-react";
import PostOptionsMenu from "./PostOptionsMenu";
// ===========================================================
function PostOptions({ post }: { post: PostType }) {
  const { activeMenu, setActiveMenu } = useActiveMenu();
  return (
    <div className="h-fit relative">
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
      <PostOptionsMenu post={post} />
    </div>
  );
}

export default PostOptions;
