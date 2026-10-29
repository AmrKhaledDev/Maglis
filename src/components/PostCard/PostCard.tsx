"use client";
import { Post } from "@/types/Post.type";
import { Pin } from "lucide-react";
import { useState } from "react";
import Comments from "../Comments/Comments";
import Author from "./_components/Author/Author";
import PostActions from "./_components/PostActions/PostActions";
import PostContent from "./_components/PostContent/PostContent";
import PostOptions from "../PostOptions/PostOptions";
// ========================================================
function PostCard({
  post,
  variant,
}: {
  post: Post;
  variant: "default" | "profile" | "videos" | "single";
}) {
  const [showComments, setShowComments] = useState(
    variant === "single" ? post.id : "",
  );
  return (
    <div
      key={post.id}
      className="p-3 bg-black/40 relative shadow rounded-lg w-full"
    >
      {variant === "profile" && post.isPinnedToProfile && (
        <p className="mb-4 text-xs text-gray-500 flex items-center gap-0.5">
          <Pin strokeWidth={1.5} className="size-4" /> مُثبت
        </p>
      )}
      <div className="flex justify-between">
        <Author post={post} />
        <PostOptions post={post} />
      </div>
      <PostContent post={post} />
      {variant !== "videos" && (
        <div className="mt-3">
          <PostActions setShowComments={setShowComments} post={post} />
          {showComments == post.id && <Comments post={post} />}
        </div>
      )}
    </div>
  );
}

export default PostCard;
