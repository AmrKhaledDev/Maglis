"use client";
import { PostType } from "@/types/Post.type";
import { Pin } from "lucide-react";
import { useState } from "react";
import Comments from "../Comments/Comments";
import PostOptions from "../PostOptions/PostOptions";
import PostActions from "./_components/PostActions/PostActions";
import PostAuthor from "./_components/PostAuthor/PostAuthor";
import PostContent from "./_components/PostContent/PostContent";
// ========================================================
function PostCard({
  post,
  variant,
}: {
  post: PostType;
  variant: "default" | "profile" | "videos" | "single";
}) {
  const [showComments, setShowComments] = useState(
    variant === "single" ? post.id : "",
  );
  return (
    <div
      key={post.id}
      className="p-3 bg-black/20 relative ring ring-white/1 shadow rounded-lg w-full"
    >
      {variant === "profile" && post.isPinnedToProfile && (
        <p className="mb-4 text-xs text-gray-500 flex items-center gap-0.5">
          <Pin strokeWidth={1.5} className="size-4" /> مُثبت
        </p>
      )}
      <div className="flex justify-between">
        <PostAuthor post={post} />
        <PostOptions post={post} />
      </div>
      <PostContent post={post} />
      {variant !== "videos" && (
        <>
          <span className="w-full h-px rounded-full bg-white opacity-1.5 block my-2" />
          <PostActions setShowComments={setShowComments} post={post} />
          {showComments == post.id && <Comments post={post} />}
        </>
      )}
    </div>
  );
}

export default PostCard;
