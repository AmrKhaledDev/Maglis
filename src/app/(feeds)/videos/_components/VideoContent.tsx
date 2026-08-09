import { PostType } from "@/types/Post.type";
import clsx from "clsx";
import Linkify from "linkify-react";
import { useState } from "react";
// ======================================
function VideoContent({ video }: { video: PostType }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      {video.content && (
        <div className="flex items-end gap-1">
          <Linkify>
            <p className={clsx(expanded ? "" : "line-clamp-2")}>
              {video.content}
            </p>
          </Linkify>
          {video.content.length > 200 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="font-bold cursor-pointer text-sm text-gray-300 shrink-0 hover:underline"
            >
              {expanded ? "عرض أقل" : "عرض المزيد"}
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default VideoContent;
