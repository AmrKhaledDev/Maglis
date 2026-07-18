"use client"
import PostAuthor from "./_components/PostAuthor/PostAuthor";
import PostContent from "./_components/PostContent/PostContent";
import PostActions from "./_components/PostActions/PostActions";
import PostOptions from "./_components/PostOptions/PostOptions";
import { useState } from "react";
import { PostDBType } from "@/types/PostDB.type";
import Comments from "./_components/Comments/Comments";
// ===================================================================
function Posts({ posts }: { posts: PostDBType[] }) {
  const [showOptions, setShowOptions] = useState("");
  const [showCommets, setShowComments] = useState("");
  return (
    <div className="w-full flex flex-col gap-3">
      {posts.map((post) => (
        <div
          key={post.id}
          className="p-3 bg-white/5 relative ring ring-gray-50/8 rounded-lg shadow"
        >
          <PostOptions
            showOptions={showOptions}
            setShowOptions={setShowOptions}
            post={post}
          />
          <PostAuthor post={post} />
          <PostContent post={post} />
          <span className="w-full h-px rounded-full bg-white opacity-3 block my-2" />
          <PostActions setShowComments={setShowComments} post={post} />
          {showCommets == post.id && <Comments post={post} />}
        </div>
      ))}
    </div>
  );
}

export default Posts;
