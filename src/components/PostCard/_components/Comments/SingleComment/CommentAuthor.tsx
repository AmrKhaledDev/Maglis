import Image from "next/image";
import "dayjs/locale/ar";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { Comment, Prisma } from "@prisma/client";
import { PostDBType } from "@/types/PostDB.type";
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
  post: PostDBType;
  comment: Comment;
}) {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={user.image ?? "/user.jpg"}
        alt="صورة المستخدم"
        width={60}
        height={60}
        className="object-cover shrink-0 size-8 rounded-full"
      />
      <div className="w-full">
        <div className="flex items-center gap-1">
          <h2 className="text-sm font-semibold">{user.name}</h2>
          <span className="size-[2.5px] rounded-full block bg-white opacity-25" />
          <h4 dir="auto" className="text-xs text-slate-300">
            @{user.username}
          </h4>
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
