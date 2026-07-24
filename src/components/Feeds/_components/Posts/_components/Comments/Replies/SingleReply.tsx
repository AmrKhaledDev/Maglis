import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import ReplyActions from "./ReplyActions";
import Replies from "./Replies";
import { CommentDbType } from "../../../../../../../types/Comment.type";
import { PostDBType } from "@/types/PostDB.type";
import ReplyHeader from "./ReplyHeader";
import ReplyAuthor from "./ReplyAuthor";
// ================================================================================
function SingleReply({
  reply,
  setShowReplyComposer,
  showReplyComposer,
  post,
  topLevelComment,
}: {
  reply: CommentDbType;
  showReplyComposer: string;
  setShowReplyComposer: Dispatch<SetStateAction<string>>;
  post: PostDBType;
  topLevelComment: CommentDbType;
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="bg-white/4 p-3 rounded-xl shadow w-full mt-2 flex flex-col gap-3">
        <ReplyHeader reply={reply} topLevelComment={topLevelComment} />
        <ReplyAuthor post={post} reply={reply} />
        <div className="flex flex-col gap-2">
          <p className="text-[11px]">{reply.content}</p>
          {reply.image && (
            <button className="relative size-25 cursor-pointer rounded-md overflow-hidden group">
              <Image
                src={reply.image}
                alt="صورة للرد"
                fill
                className="object-cover shrink-0"
              />
              <span className="inset-0 absolute bg-black/15 group-hover:opacity-0 mytransition" />
            </button>
          )}
        </div>
        <hr className="border-white opacity-2" />
        <ReplyActions
          setShowReplyComposer={setShowReplyComposer}
          reply={reply}
        />
      </div>
      <Replies
        userOwnerCommentName={reply.user.name}
        comment={reply}
        setShowReplyComposer={setShowReplyComposer}
        showReplyComposer={showReplyComposer}
        initialRepliesCount={reply._count.replies}
        post={post}
        topLevelComment={topLevelComment}
      />
    </div>
  );
}

export default SingleReply;