"use client";
import PostOptions from "../PostOptions/PostOptions";
import PostAuthor from "./_components/PostAuthor/PostAuthor";
import PostContent from "./_components/PostContent/PostContent";
import PostActions from "./_components/PostActions/PostActions";
import Comments from "../Comments/Comments";
import { Dispatch, SetStateAction } from "react";
import { Pin } from "lucide-react";
import { PostType } from "@/types/Post.type";
// ========================================================
function PostCard({
  post,
  showComments,
  setShowComments,
  isProfilePage,
  isVideosPage,
}: {
  post: PostType;
  showComments?: string;
  setShowComments?: Dispatch<SetStateAction<string>>;
  isProfilePage?: boolean;
  isVideosPage?: boolean;
}) {
  return (
    <div
      key={post.id}
      className="p-3 bg-black/20 relative ring ring-white/1 shadow rounded-lg w-full"
    >
      {isProfilePage && post.isPinnedToProfile && (
        <p className="mb-4 text-xs font-semibold text-green-600 flex items-center gap-0.5">
          <Pin className="size-4" /> مُثبت
        </p>
      )}
      <div className="flex justify-between">
        <PostAuthor post={post} />
        <PostOptions post={post} />
      </div>
      <PostContent post={post} />
      {!isVideosPage && setShowComments && (
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
