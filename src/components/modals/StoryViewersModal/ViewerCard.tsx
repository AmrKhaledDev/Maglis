import dayjs from "dayjs";
import Link from "next/link";
import "dayjs/locale/ar";
import relativeTime from "dayjs/plugin/relativeTime";
import UserImage from "@/components/UserImage/UserImage";
import StoryViewerType from "./_types/StoryViewer.type";
// ========================================================
dayjs.extend(relativeTime);
dayjs.locale("ar");
function ViewerCard({ viewer }: { viewer: StoryViewerType }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-4">
        <UserImage
          src={viewer.viewer.image}
          size="size-14"
          alt={viewer.viewer.name}
        />
        <div className="flex flex-col flex-1">
          <div className="flex items-center gap-2">
            <Link
              href={`/u/${viewer.id}`}
              className="font-medium hover:underline decoration-1"
            >
              {viewer.viewer.name}
            </Link>
            {viewer.viewer.username && (
              <>
                <span className="size-0.5 bg-white block rounded-full" />
                <p className="text-[11px] text-gray-200">
                  {viewer.viewer.username}@
                </p>
              </>
            )}
          </div>
          <p className="text-xs text-gray-300 font-light">
            {dayjs(viewer.createdAt).fromNow()}
          </p>
        </div>
      </div>
      <Link
        href={`/conversations/${viewer.viewerId}`}
        target="_blank"
        className="flex items-center gap-2 text-xs bg-linear-to-t from-blue-900 to-blue-800 py-1.5 px-6 shadow cursor-pointer font-bold text-gray-300 hover:from-blue-800 hover:to-blue-700 rounded-full"
      >
        رسالة
      </Link>
    </div>
  );
}

export default ViewerCard;
