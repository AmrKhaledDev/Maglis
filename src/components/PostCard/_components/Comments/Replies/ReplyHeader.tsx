import Link from "next/link";
import { useUser } from "@/providers/UserProvider";
import { CommentDbType } from "@/types/Comment.type";
import ReplyOptions from "./ReplyOptions";
// ===============================================================
function ReplyHeader({
  reply,
  topLevelComment,
}: {
  reply: CommentDbType;
  topLevelComment: CommentDbType;
}) {
  if (!reply.parent) return null;
  const user = useUser();
  const urlProfile =
    user.id === reply.parent.userId ? "/profile" : `/u/profile/${reply.userId}`;
  const urlTopLevelCommentOwner =
    user.id === topLevelComment.userId
      ? "/profile"
      : `/u/profile/${reply.userId}`;
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-5 mb-1">
        <p className="text-[10px] text-gray-400 flex items-center gap-1">
          رداً على
          <Link
            href={urlProfile}
            className="text-blue-400 block hover:underline"
          >
            {reply.parent?.user.name}
          </Link>
        </p>
        <p className="text-[10px] text-gray-400 flex items-center gap-1">
          في تعليق
          <Link
            href={urlTopLevelCommentOwner}
            className="text-blue-400 block hover:underline"
          >
            {topLevelComment.user.name}
          </Link>
        </p>
      </div>
      <ReplyOptions reply={reply} />
    </div>
  );
}

export default ReplyHeader;
