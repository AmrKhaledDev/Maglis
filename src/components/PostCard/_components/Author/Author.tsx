import UserImage from "@/components/UserImage/UserImage";
import privacyMap from "@/data/privacyMap";
import { Post } from "@/types/Post.type";
import dayjs from "dayjs";
import local from "dayjs/locale/ar";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import AuthorActions from "./AuthorAction";
// ====================================================
dayjs.extend(relativeTime);
dayjs.locale(local);
function Author({ post }: { post: Post }) {
  const Icon = privacyMap[post.privacy].icon;
  return (
    <div className="flex gap-2 items-center">
      <Link
        href={`/u/${post.authorId}`}
        className="font-semibold  text-gray-100 line-clamp-1 [word-break:break-word]"
      >
        <UserImage src={post.author.image} size="size-10" />
      </Link>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Link
              href={`/u/${post.authorId}`}
              className="text-gray-100 line-clamp-1 [word-break:break-word] hover:underline hover:decoration-1 font-semibold"
            >
              {post.author.name}
            </Link>
            <Icon className="size-3 text-gray-400 mb-px" />
          </div>
          <AuthorActions post={post} />
        </div>
        <div className="flex items-center gap-1.5">
          {post.author.username && (
            <>
              <p className="text-[11px] text-gray-400">
                {post.author.username}@
              </p>
              <span className="size-[3.5px] rounded-full bg-white block opacity-5 shrink-0" />
            </>
          )}
          <p className="text-[11px] text-slate-400 font-normal">
            {dayjs(post.createdAt).fromNow()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Author;
