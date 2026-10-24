import StoryType from "@/components/Feeds/_types/Story.type";
import UserImage from "@/components/UserImage/UserImage";
import { UserStoryType } from "@/types/UserStoryType";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import ButtonStoryViewers from "./ButtonStoryViewers";
// =============================================================
dayjs.extend(relativeTime);
dayjs.locale("ar");
function Author({
  user,
  story,
}: {
  user: UserStoryType;
  story: StoryType ;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <Link href={`/u/${story.userId}`}>
        <UserImage src={user.image} alt={user.name} size="size-10" />
      </Link>
      <div>
        <div className="flex items-center gap-1.5">
          <Link
            href={`/u/${user.id}`}
            className="font-bold hover:underline decoration-1"
          >
            {user.name}
          </Link>
          <span className="size-0.5 bg-gray-200 block rounded-full shrink-0" />
          <p className="text-[11px] font-semibold">
            {dayjs(story.createdAt).fromNow()}
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <p dir="auto" className="w-fit text-[11px] font-medium">
            @{user.username}
          </p>
          <ButtonStoryViewers story={story} user={user} />
        </div>
      </div>
    </div>
  );
}

export default Author;
