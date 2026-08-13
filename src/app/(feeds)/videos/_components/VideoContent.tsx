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
        <div className="flex flex-col gap-2">
          <Linkify>
            <p className={clsx("text-sm",expanded ? "" : "line-clamp-3")}>
              {video.content}
            </p>
          </Linkify>
          {video.content.length > 200 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="font-bold cursor-pointer w-fit text-sm text-blue-600 shrink-0 hover:underline"
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
