import privacyMap from "@/data/privacyMap";
import { SavePostType } from "@/types/SavePost.type";
import dayjs from "dayjs";
import { FaComment, FaHeart } from "react-icons/fa6";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ar";
// ==============================================================
dayjs.extend(relativeTime);
dayjs.locale("ar");
function MetaData({ item }: { item: SavePostType }) {
  const PrivacyIcon = privacyMap[item.post.privacy].icon;
  const privacyLabel = privacyMap[item.post.privacy].label;
  return (
    <div className="flex items-center gap-2 text-gray-400 text-xs">
      <p className="flex items-center gap-1 leading-none">
        <PrivacyIcon className="pb-1 size-4" />
        {privacyLabel}
      </p>
      <span className="size-0.5 bg-white/50 rounded-full block" />
      <p className="flex items-center gap-1.5">
        <FaHeart className="size-3" strokeWidth={1.5} />
        <span className="leading-none pt-1.5">{item.post._count.likes}</span>
      </p>
      <span className="size-0.5 bg-white/50 rounded-full block" />
      <p className="flex items-center gap-1.5">
        <FaComment className="size-3" strokeWidth={1.5} />
        <span className="leading-none pt-1.5">{item.post._count.comments}</span>
      </p>
      <span className="size-0.5 bg-white/50 rounded-full block" />
      <p className="pt-1">{dayjs(item.post.createdAt).fromNow()}</p>
    </div>
  );
}

export default MetaData;
