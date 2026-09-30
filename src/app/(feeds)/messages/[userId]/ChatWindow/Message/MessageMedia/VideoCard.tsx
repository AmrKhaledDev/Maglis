import { MessageMedia } from "@prisma/client";
import clsx from "clsx";
import ReactPlayer from "react-player";
// =================================================
function VideoCard({
  media,
  mediaLength,
}: {
  media: MessageMedia;
  mediaLength: number;
}) {
  return (
    <>
      {media.mediaType === "VIDEO" && (
        <div
          className={clsx(
            mediaLength > 1
              ? "xl:size-80 md:size-58 sm:size-80 size-70"
              : "w-full h-full",
          )}
        >
          <ReactPlayer
            src={media.mediaUrl}
            width="100%"
            height="100%"
            controls
            className="rounded-md bg-black"
          />
        </div>
      )}
    </>
  );
}

export default VideoCard;
