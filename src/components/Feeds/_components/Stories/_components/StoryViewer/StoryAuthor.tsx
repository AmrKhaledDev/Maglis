import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ar";
import Image from "next/image";
import { useUser } from "@/providers/UserProvider";
import Link from "next/link";
import { Story } from "@prisma/client";
import { UserStoryType } from "@/types/UserStoryType";
// ====================================================
dayjs.extend(relativeTime);
dayjs.locale("ar");
function StoryAuthor({ user, story }: { user: UserStoryType; story: Story }) {
  const userSession = useUser();
  return (
    <div className="absolute top-5 right-8 z-5 flex items-center gap-2.5">
      <Link
        href={
          story.userId === userSession.id ? "/u/profile" : `/u/${story.userId}`
        }
      >
        <Image
          src={user.image || "/user.jpg"}
          width={70}
          height={70}
          alt={user.name}
          className="rounded-full object-cover shrink-0 size-9"
        />
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

export default StoryAuthor;
