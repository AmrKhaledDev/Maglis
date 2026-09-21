import { MessageMedia as MessageMediaPrismaType } from "@prisma/client";
import clsx from "clsx";
import ImageCard from "./ImageCard";
import PdfCard from "./PdfCard";
import VideoCard from "./VideoCard";
// ================================================================
function MessageMedia({
  messageMedia,
}: {
  messageMedia: MessageMediaPrismaType[];
}) {
  return (
    <div
      className={clsx(
        "w-fit",
        messageMedia.length > 1 && "flex items-center gap-1 flex-wrap",
      )}
    >
      {messageMedia.map((media) => (
        <div key={media.id} className="w-fit">
          <ImageCard media={media} mediaLength={messageMedia.length} />
          <VideoCard media={media} mediaLength={messageMedia.length} />
          <PdfCard media={media} mediaLength={messageMedia.length} />
        </div>
      ))}
    </div>
  );
}

export default MessageMedia;
