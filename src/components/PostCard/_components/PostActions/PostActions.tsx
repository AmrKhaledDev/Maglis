"use client"
import { MessageCircle } from "lucide-react";
import SavePostBtn from "./SavePostBtn";
import LikeBtn from "./LikeBtn";
import { formatLikes } from "@/formats/formatLikes";
import { formatComments } from "@/formats/formatComments";
import { Dispatch, SetStateAction } from "react";
import { PostType } from "@/types/Post.type";
// =============================================
function PostActions({
  post,
  setShowComments,
}: {
  post: PostType;
  setShowComments: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <LikeBtn post={post} />
        <button
          onClick={() => setShowComments(post.id)}
          className="cursor-pointer flex items-center gap-1 text-gray-100"
        >
          <MessageCircle className="postBtnOptIcon" strokeWidth={1} />
        </button>
      </div>
      <div className="flex items-center gap-3">
        <p className="font-normal text-xs text-gray-300">
          {formatLikes(post.likes.length)}
        </p>
        <p className="font-normal text-xs text-gray-300">
          {formatComments(post.comments.length)}
        </p>
        <SavePostBtn post={post} />
      </div>
    </div>
  );
}

export default PostActions;
