"use client";
import { useState } from "react";
import { PostDBType } from "@/types/PostDB.type";
import PostCard from "@/components/PostCard/PostCard";
// ===================================================================
function Posts({ posts }: { posts: PostDBType[] }) {
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
