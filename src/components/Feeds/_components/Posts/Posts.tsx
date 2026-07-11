"use client";
import PostAuthor from "./_components/PostAuthor";
import PostContent from "./_components/PostContent";
import PostActions from "./_components/PostActions";
import PostOptions from "./_components/PostOptions";
import { useState } from "react";
import { PostsDBType } from "@/types/PostsDBType";
// ===================================================================
function Posts({ posts }: { posts: PostsDBType[] }) {
  const [showOptions, setShowOptions] = useState("");
  return (
    <div className="w-full flex flex-col gap-3">
      {posts.map((post) => (
        <div
          key={post.id}
          className="p-3 bg-white/5 relative ring ring-gray-50/15 rounded-xl shadow space-y-5"
        >
          <PostOptions
            showOptions={showOptions}
            setShowOptions={setShowOptions}
            postId={post.id}
          />
          <PostAuthor post={post} />
          <span className="w-full h-px rounded-full bg-white opacity-2 block" />
          <PostContent post={post} />
          <span className="w-full h-px rounded-full bg-white opacity-5 block" />
          <PostActions />
        </div>
      ))}
    </div>
  );
}

export default Posts;
