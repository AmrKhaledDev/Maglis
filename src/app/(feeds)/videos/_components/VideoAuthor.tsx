import { useUser } from "@/providers/UserProvider";
import { ClockFading, UserRoundPlus } from "lucide-react";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import local from "dayjs/locale/ar";
import { formatLikes } from "@/formats/formatLikes";
import { formatComments } from "@/formats/formatComments";
import Image from "next/image";
import { PostType } from "@/types/Post.type";
// ===============================================================
dayjs.extend(relativeTime);
dayjs.locale(local);
function VideoAuthor({ video }: { video: PostType }) {
  const user = useUser();
  return (
    <div className="flex items-center gap-3 ">
      <Link
        href={
          user.id === video.authorId ? "/u/profile" : `/u/${video.authorId}`
        }
      >
        <Image
          src={video.author.image || "/user.jpg"}
          alt="صورة المستخدم"
          width={50}
          height={50}
          className="size-10 rounded-full shrink-0 object-cover"
        />
      </Link>
      <div className="space-y-0.5 w-full">
        <div className="flex items-center gap-2">
          <Link
            href={
              user.id === video.authorId ? "/u/profile" : `/u/${video.authorId}`
            }
            className="text-[18px] font-semibold text-gray-200"
          >
            {video.author.name}
          </Link>
          <h3 className="text-sm text-gray-400 font-semibold">
            {video.author.username}@
          </h3>
          <span className="size-[3.5px] bg-white/5 block rounded-full" />
          <button className="text-[11px] hover:scale-105 mytransition active:scale-95 flex font-semibold items-center gap-2 cursor-pointer border border-blue-500/10 text-blue-400 bg-blue-900/30 py-1 px-4 rounded-full shadow">
            <UserRoundPlus className="size-3.5" /> متابعة
          </button>
        </div>
        <div className="flex items-center justify-between w-full">
          <p className="text-xs text-gray-400 flex items-center gap-1">
            <ClockFading className="size-3.5" strokeWidth={1.5} />
            {dayjs(video.createdAt).fromNow()}
          </p>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-300">
              {formatLikes(video.likes.length)}
            </span>
            <span className="text-xs text-gray-300">
              {formatComments(video.comments.length)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoAuthor;
