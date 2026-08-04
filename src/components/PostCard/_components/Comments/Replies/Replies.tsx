import ReplyComposer from "./ReplyComposer";
import { useState } from "react";
import { GetCommentRepliesAction } from "@/actions/Reply/GetCommentReplies.action";
import SingleReply from "./SingleReply";
import { CommentDbType } from "../../../../../types/Comment.type";
import { PostDBType } from "@/types/Post.type";
import ButtonShowReplies from "./ButtonShowReplies";
import { useQuery } from "@tanstack/react-query";
// ============================================================
function Replies({
  userOwnerCommentName,
  comment,
  initialRepliesCount,
  post,
  topLevelComment,
}: {
  userOwnerCommentName: string;
  comment: CommentDbType;
  initialRepliesCount: number;
  post: PostDBType;
  topLevelComment: CommentDbType;
}) {
  const [showRepliesList, setShowRepliesList] = useState(false);
  const { data: replies = [], isLoading: loading } = useQuery({
    queryKey: ["replies", comment.id],
    queryFn: async () => {
      const result = await GetCommentRepliesAction(comment.id);
      if (!result.success || !result.data) return [];
      return result.data;
    },
    enabled: showRepliesList,
  });
  const handleShowReplies = () => {
    setShowRepliesList((prev) => !prev);
  };
  const repliesCount =
    replies.length > 0 ? replies.length : initialRepliesCount;
  return (
    <div className="w-full flex flex-col">
      <ReplyComposer
        parentId={comment.id}
        userOwnerCommentName={userOwnerCommentName}
        setShowRepliesList={setShowRepliesList}
      />

      <ButtonShowReplies
        handleShowReplies={handleShowReplies}
        loading={loading}
        repliesCount={repliesCount}
        showRepliesList={showRepliesList}
      />
      {showRepliesList && replies.length > 0 && (
        <div className="w-full flex flex-col items-end">
          {replies.map((reply) => (
            <SingleReply
              key={reply.id}
              reply={reply}
              post={post}
              topLevelComment={topLevelComment}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Replies;
