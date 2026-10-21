import UserImage from "@/components/UserImage/UserImage";
import { UserStoryType } from "@/types/UserStoryType";
import { Story } from "@prisma/client";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
// ====================================================
dayjs.extend(relativeTime);
dayjs.locale("ar");
function Author({ user, story }: { user: UserStoryType; story: Story }) {
  return (
    <div className="absolute top-5 right-8 z-5 flex items-center gap-2.5">
      <Link href={`/u/${story.userId}`}>
        <UserImage src={user.image} alt={user.name} size="size-9" />
      </Link>
      <div>
        <div className="flex items-center gap-1.5">
          <h2 className="text-[18px] font-medium">{user.name}</h2>
          <span className="size-0.75 bg-gray-200 block rounded-full shrink-0" />
          <p className="text-[10px] font-semibold">
            {dayjs(story.createdAt).fromNow()}
          </p>
        </div>
        <p dir="auto" className="w-fit text-xs text-gray-100">
          @{user.username}
        </p>
      </div>
    </div>
  );
}

export default Author;
