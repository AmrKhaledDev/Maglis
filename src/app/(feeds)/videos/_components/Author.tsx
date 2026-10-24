import FollowButton from "@/components/FollowButton/FollowButton";
import PostLikersModal from "@/components/modals/PostLikersModal";
import UserImage from "@/components/UserImage/UserImage";
import { formatComments } from "@/formats/formatComments";
import { formatLikes } from "@/formats/formatLikes";
import { useActiveModal } from "@/providers/ActiveModalProvider";
import { useUser } from "@/providers/UserProvider";
import { PostType } from "@/types/Post.type";
import dayjs from "dayjs";
import local from "dayjs/locale/ar";
import relativeTime from "dayjs/plugin/relativeTime";
import { ClockFading } from "lucide-react";
import Link from "next/link";
// ===============================================================
dayjs.extend(relativeTime);
dayjs.locale(local);
function Author({ video }: { video: PostType }) {
  const userSession = useUser();
  const { activeModal, setActiveModal } = useActiveModal();
  return (
    <div className="flex items-center gap-3">
      <Link href={`/u/${video.authorId}`}>
        <UserImage
          src={video.author.image}
          alt={video.author.name}
          size="size-10"
        />
      </Link>
      <div className="space-y-0.5 w-full">
        <div className="flex items-center gap-1.5">
          <Link
            href={`/u/${video.authorId}`}
            className="text-sm font-semibold text-gray-200"
          >
            {video.author.name}
          </Link>
          <h3 className="text-xs text-gray-400 font-semibold">
            {video.author.username}@
          </h3>
          {userSession.id !== video.authorId && (
            <>
              <span className="size-[3.5px] bg-white/5 block rounded-full" />
              <FollowButton
                followingId={video.authorId}
                followStyle="bg-blue-900/30 text-blue-400 shadow hover:bg-blue-900/40"
                unfollowStyle="hover:text-gray-300"
                publicStyle="text-xs active:scale-95 mytransition flex font-semibold items-center gap-2 cursor-pointer py-1.5 px-3 rounded-md"
                iconStyle="size-4"
              />
            </>
          )}
        </div>
        <div className="flex items-center justify-between w-full">
          <p className="text-xs text-gray-400 flex items-center gap-1">
            <ClockFading className="size-3.5" strokeWidth={1.5} />
            {dayjs(video.createdAt).fromNow()}
          </p>
          <div className="flex items-center gap-2">
            {video.likes.length > 0 ? (
              <button
                onClick={() => setActiveModal(video.id)}
                className="text-[11px] text-gray-300 cursor-pointer hover:underline"
              >
                {formatLikes(video.likes.length)}
              </button>
            ) : (
              <span className="text-[11px] text-gray-300">لا توجد إعجابات</span>
            )}
            {activeModal === video.id && <PostLikersModal post={video} />}
            <span className="text-[11px] text-gray-300">
              {formatComments(video._count.comments)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Author;
