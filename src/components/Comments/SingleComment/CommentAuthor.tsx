import UserImage from "@/components/UserImage/UserImage";
import { Post } from "@/types/Post.type";
import { Comment, Prisma } from "@prisma/client";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
// =========================================================================
dayjs.locale("ar");
dayjs.extend(relativeTime);
function CommentAuthor({
  user,
  post,
  comment,
}: {
  user: Prisma.UserGetPayload<{
    select: {
      id: true;
      name: true;
      image: true;
      username: true;
    };
  }>;
  post: Post;
  comment: Comment;
}) {
  return (
    <div className="flex items-center gap-2">
      <UserImage src={user.image} alt={user.name} size="size-8" />
      <div className="w-full">
        <div className="flex items-center gap-1">
          <Link
            target="_blank"
            href={`/u/${comment.userId}`}
            className="text-sm font-semibold"
          >
            {user.name}
          </Link>
          {user.username && (
            <>
              <span className="size-[2.5px] rounded-full block bg-white opacity-25" />
              <h4 className="text-xs text-slate-300">{user.username}@</h4>
            </>
          )}
          {comment.isEdited && (
            <p className="text-[10px] mr-2 text-gray-400">مُعدله</p>
          )}
          {post.authorId == user.id && (
            <p className="mr-4 text-slate-300 text-[10px] bg-[#09090B]/20 py-px px-2 rounded ring ring-[#09090B]/25">
              الكاتب
            </p>
          )}
        </div>
        <p className="text-[10px] text-slate-300">
          {dayjs(comment.createdAt).fromNow()}
        </p>
      </div>
    </div>
  );
}

export default CommentAuthor;
