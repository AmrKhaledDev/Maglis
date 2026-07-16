import {  MessageCircle } from "lucide-react";
import SavePostBtn from "./SavePostBtn";
import { PostDBType } from "@/types/PostDB.type";
import LikeBtn from "./LikeBtn";
import { formatLikes } from "@/formats/formatLikes";
// =============================================
function PostActions({ post }: { post: PostDBType }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <LikeBtn post={post} />
       
        <button className="cursor-pointer flex items-center gap-1 text-gray-100">
          <MessageCircle className="postBtnActIcon" strokeWidth={1} />
        </button>
      </div>
      <div className="flex items-center gap-3">
        <p className="font-normal text-xs text-gray-300">
          {formatLikes(post.likes.length)}
        </p>
        <p className="font-normal text-xs text-gray-300">
          <span>10</span> تعليقات
        </p>
        <SavePostBtn post={post} />
      </div>
    </div>
  );
}

export default PostActions;
