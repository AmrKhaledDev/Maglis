"use client"
import PostOptions from "./_components/PostOptions/PostOptions";
import PostAuthor from "./_components/PostAuthor/PostAuthor";
import PostContent from "./_components/PostContent/PostContent";
import PostActions from "./_components/PostActions/PostActions";
import Comments from "./_components/Comments/Comments";
import { PostDBType } from "@/types/PostDB.type";
import { Dispatch, SetStateAction } from "react";
// ========================================================
function PostCard({
  post,
  showComments,
  setShowComments,
}: {
  post: PostDBType;
  showComments: string;
  setShowComments:Dispatch<SetStateAction<string>>
}) {
  return (
    <div
      key={post.id}
      className="p-3 bg-white/5 relative ring ring-gray-50/8 rounded-lg shadow"
    >
      <PostOptions post={post} />
      <PostAuthor post={post} />
      <PostContent post={post} />
      <span className="w-full h-px rounded-full bg-white opacity-3 block my-2" />
      <PostActions setShowComments={setShowComments} post={post} />
      {showComments == post.id && <Comments post={post} />}
    </div>
  );
}

export default PostCard;
