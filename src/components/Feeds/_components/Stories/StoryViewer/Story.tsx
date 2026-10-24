import { usePlayingVideoId } from "@/providers/PlayingVideoIdProvider";
import { Story as StoryPrismaType } from "@prisma/client";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import ReactPlayer from "react-player";
// =======================================
function Story({
  story,
  muteStoryVideo,
}: {
  story: StoryPrismaType;
  muteStoryVideo: string;
}) {
  const { playingVideoId } = usePlayingVideoId();
  const [expanded, setExpanded] = useState("");
  return (
    <div
      style={{
        background: !story.media && story.color ? story.color : "#000000",
      }}
      className="absolute inset-0 flex items-center justify-center z-1"
    >
      {story.media && (
        <div className="w-full h-full">
          {story.mediaType == "IMAGE" && (
            <Image
              src={story.media}
              className="object-cover opacity-80"
              alt="صورة"
              fill
            />
          )}
          {story.mediaType === "VIDEO" && (
            <ReactPlayer
              playing={playingVideoId === story.id}
              src={story.media}
              width="100%"
              height="100%"
              className="opacity-90"
              muted={muteStoryVideo === story.id}
            />
          )}
          {story.contentText && (
            <div className="absolute font-medium right-0 bottom-0 text-[18px] h-fit w-full flex items-end gap-1 px-4 bg-black/20 pb-7 pt-3">
              <p
                className={clsx(
                  "w-full text-center [word-break:break-word]",
                  expanded === story.id ? "" : "line-clamp-2 ",
                )}
              >
                {story.contentText}
              </p>
              {story.contentText.length > 50 && (
                <button
                  onClick={() =>
                    setExpanded((prev) => (prev === story.id ? "" : story.id))
                  }
                  className="text-nowrap font-bold cursor-pointer w-fit hover:underline decoration-1 text-sm"
                >
                  {expanded === story.id ? "عرض أقل" : "عرض المزيد"}
                </button>
              )}
            </div>
          )}
        </div>
      )}
      {!story.media && story.contentText && (
        <p className="text-3xl text-center font-medium leading-10">
          {story.contentText}
        </p>
      )}
    </div>
  );
}

export default Story;
