"use client";
import PostLikersModal from "@/components/modals/PostLikersModal";
import { formatComments } from "@/formats/formatComments";
import { formatLikes } from "@/formats/formatLikes";
import { useActiveModal } from "@/providers/ActiveModalProvider";
import { PostType } from "@/types/Post.type";
import { MessageCircle } from "lucide-react";
import { Dispatch, SetStateAction, useEffect } from "react";
import LikeButton from "./LikeButton";
import SavePostButton from "../../../SavePostButton/SavePostButton";
// =============================================
function PostActions({
  post,
  setShowComments,
}: {
  post: PostType;
  setShowComments: Dispatch<SetStateAction<string>>;
}) {
  const { activeModal, setActiveModal } = useActiveModal();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <LikeButton post={post} />
        <button
          onClick={() => setShowComments(post.id)}
          className="cursor-pointer flex items-center gap-1 text-gray-100"
        >
          <MessageCircle className="btnOptIcon size-5" strokeWidth={1} />
        </button>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setActiveModal(post.id)}
          className="font-normal text-xs text-gray-300 hover:underline cursor-pointer showLikersButton"
        >
          {formatLikes(post.likes.length)}
        </button>
        {activeModal === post.id && <PostLikersModal post={post} />}
        <p className="font-normal text-xs text-gray-300">
          {formatComments(post._count.comments)}
        </p>
        <SavePostButton post={post} />
      </div>
    </div>
  );
}

export default PostActions;
