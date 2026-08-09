"use client";
import { useState } from "react";
import PostCard from "@/components/PostCard/PostCard";
import { PostType } from "@/types/Post.type";
// ===================================================================
function Posts({ posts }: { posts: PostType[] }) {
  const [showComments, setShowComments] = useState("");
  return (
    <div className="w-full flex flex-col gap-3">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          setShowComments={setShowComments}
          showComments={showComments}
        />
      ))}
    </div>
  );
}

export default Posts;
