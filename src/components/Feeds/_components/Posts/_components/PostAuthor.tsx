import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import relativeTime from "dayjs/plugin/relativeTime";
import local from "dayjs/locale/ar";
import { PostsDBType } from "@/types/PostsDBType";
import { Globe, Lock, Users } from "lucide-react";
// =========================================
dayjs.extend(relativeTime);
dayjs.locale(local);
function PostAuthor({ post }: { post: PostsDBType }) {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={post.author.image || "/user.jpg"}
        alt="صورة المستخدم"
        width={50}
        height={50}
        className="rounded-full object-cover shrink-0 size-11"
      />
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <Link
            href={"/"}
            className="font-semibold text-gray-100 line-clamp-1 [word-break:break-word]"
          >
            {post.author.name}
          </Link>
          <button className="text-sm text-blue-400 cursor-pointer hover:underline font-semibold">
            متابعة
          </button>
        </div>
        <div className="flex items-center gap-1.5">
          <p className="text-xs text-slate-200 font-normal">
            {dayjs(post.createdAt).fromNow()}
          </p>
          <span className="size-1 rounded-full bg-white block opacity-10"/>
          {post.privacy == "PUBLIC" &&<Globe className="size-3.5 text-gray-400"/>}
          {post.privacy == "PRIVATE" &&<Lock className="size-3.5 text-gray-400"/>}
          {post.privacy == "FRIENDS" &&<Users className="size-3.5 text-gray-400"/>}
        </div>
      </div>
    </div>
  );
}

export default PostAuthor;
