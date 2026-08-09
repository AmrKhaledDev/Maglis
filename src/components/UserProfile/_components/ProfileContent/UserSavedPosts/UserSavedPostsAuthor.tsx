import PostPrivacy from "@/components/PostPrivacy/PostPrivacy";
import dayjs from "dayjs";
import Image from "next/image";
import relativeTime from "dayjs/plugin/relativeTime";
import { SavePostType } from "@/types/SavePost.type";
// =====================================================
dayjs.extend(relativeTime);
dayjs.locale("ar");
function UserSavedPostsAuthor({ saveItem }: { saveItem: SavePostType }) {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={saveItem.post.author.image || "/user.jpg"}
        alt="صورة المستخدم"
        width={50}
        height={50}
        className="size-9 rounded-full shrink-0 object-cover"
      />
      <div>
        <div className="flex items-center gap-1.5">
          <h2 className="font-semibold text-sm text-gray-100 line-clamp-1 [word-break:break-word]">
            {saveItem.post.author.name}
          </h2>
        </div>
        <div className="flex items-center gap-1.5">
          {saveItem.post.author.username && (
            <>
              <p dir="auto" className="text-[11px] text-gray-400">
                @{saveItem.post.author.username}
              </p>
              <span className="size-[3.5px] rounded-full bg-white block opacity-5 shrink-0" />
            </>
          )}
          <p className="text-[11px] text-slate-400 font-normal">
            {dayjs(saveItem.post.createdAt).fromNow()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserSavedPostsAuthor;
