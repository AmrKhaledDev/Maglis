"use client";
import { useState } from "react";
import PostCard from "@/components/PostCard/PostCard";
import { PostType } from "@/types/Post.type";
import PostsSkeleton from "./PostsSkeleton";
// ===================================================================
function Posts({
  posts,
  isPending,
}: {
  posts: PostType[] | undefined;
  isPending: boolean;
}) {
  const [showComments, setShowComments] = useState("");
  return (
    <>
      {isPending ? (
        <PostsSkeleton />
      ) : (
        <div className="w-full flex flex-col gap-5">
          {posts &&
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                setShowComments={setShowComments}
                showComments={showComments}
              />
            ))}
        </div>
      )}
    </>
  );
}

export default Posts;
