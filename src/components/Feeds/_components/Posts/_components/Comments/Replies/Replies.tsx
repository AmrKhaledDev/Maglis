import ReplyComposer from "./ReplyComposer";
import { Dispatch, SetStateAction, useState } from "react";
import { GetCommentRepliesAction } from "@/actions/Reply/GetCommentReplies.action";
import SingleReply from "./SingleReply";
import { CommentDbType } from "../../../../../../../types/Comment.type";
import { PostDBType } from "@/types/PostDB.type";
import ButtonShowReplies from "./ButtonShowReplies";
// ============================================================
function Replies({
  userOwnerCommentName,
  showReplyComposer,
  comment,
  setShowReplyComposer,
  initialRepliesCount,
  post,
  topLevelComment,
}: {
  userOwnerCommentName: string;
  showReplyComposer: string;
  comment: CommentDbType;
  setShowReplyComposer: Dispatch<SetStateAction<string>>;
  initialRepliesCount: number;
  post: PostDBType;
  topLevelComment: CommentDbType;
}) {
  const [repliesCount, setRepliesCount] = useState(initialRepliesCount);
  const [replies, setReplies] = useState<CommentDbType[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [showRepliesList, setShowRepliesList] = useState(false);
  const handleFetchReplies = async () => {
    if (showRepliesList) {
      return setShowRepliesList(false);
    }
    if (!hasFetched) {
      setLoading(true);
      const result = await GetCommentRepliesAction(comment.id);
      if (!result.success || !result.data) return setLoading(false);
      setReplies(result.data);
      setHasFetched(true);
      setLoading(false);
    }
    setShowRepliesList(true);
  };
  const handleAddReplyLocally = (newReply: CommentDbType) => {
    setReplies((prev) => [...prev, newReply]);
    setShowRepliesList(true);
    setHasFetched(true);
    setRepliesCount((prev) => (prev += 1));
  };
  return (
    <div className="w-full flex flex-col">
      {showReplyComposer === comment.id && (
        <ReplyComposer
          handleAddReplyLocally={handleAddReplyLocally}
          parentId={comment.id}
          setShowReplyComposer={setShowReplyComposer}
          userOwnerCommentName={userOwnerCommentName}
          showReplyComposer={showReplyComposer}
        />
      )}
      <ButtonShowReplies
        handleFetchReplies={handleFetchReplies}
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
              showReplyComposer={showReplyComposer}
              setShowReplyComposer={setShowReplyComposer}
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
