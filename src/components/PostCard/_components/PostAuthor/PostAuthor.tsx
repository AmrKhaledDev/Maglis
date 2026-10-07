import UserImage from "@/components/UserImage/UserImage";
import { useUrlUserProfile } from "@/hooks/useUrlUserProfile";
import { PostType } from "@/types/Post.type";
import dayjs from "dayjs";
import local from "dayjs/locale/ar";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import PostPrivacy from "../../../PostPrivacy/PostPrivacy";
import PostAuthorActions from "./PostAuthorAction";
// =========================================
dayjs.extend(relativeTime);
dayjs.locale(local);
function PostAuthor({ post }: { post: PostType }) {
  return (
    <div className="flex gap-2 items-center">
      <Link
        href={useUrlUserProfile(post.authorId)}
        className="font-semibold  text-gray-100 line-clamp-1 [word-break:break-word]"
      >
        <UserImage imageUrl={post.author.image} size="size-10" />
      </Link>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Link
              href={useUrlUserProfile(post.authorId)}
              className="text-gray-100 line-clamp-1 [word-break:break-word] hover:underline hover:decoration-1 font-semibold"
            >
              {post.author.name}
            </Link>
            <PostPrivacy privacy={post.privacy} />
          </div>
          <PostAuthorActions post={post} />
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

export default PostAuthor;
