"use client";
import PostAuthor from "./_components/PostAuthor/PostAuthor";
import PostContent from "./_components/PostContent";
import PostActions from "./_components/PostActions";
import PostOptions from "./_components/PostOptions";
import { useState } from "react";
import { PostDBType } from "@/types/PostDBType";
// ===================================================================
function Posts({ posts }: { posts: PostDBType[]}) {
  const [showOptions, setShowOptions] = useState("");
  return (
    <div className="w-full flex flex-col gap-3">
      {posts.map((post) => (
        <div
          key={post.id}
          className="p-3 bg-white/5 relative ring ring-gray-50/15 rounded-lg shadow"
        >
          <PostOptions
            showOptions={showOptions}
            setShowOptions={setShowOptions}
            postId={post.id}
          />
          <PostAuthor post={post} />
          <PostContent post={post} />
          <span className="w-full h-px rounded-full bg-white opacity-3 block my-2" />
          <PostActions />
        </div>
      ))}
    </div>
  );
}

export default Posts;
