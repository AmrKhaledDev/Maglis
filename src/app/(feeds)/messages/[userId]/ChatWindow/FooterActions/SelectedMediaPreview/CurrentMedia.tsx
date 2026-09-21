import Image from "next/image";
import PdfViewer from "@/components/PdfThumbnail/PdfThumbnail";
import ReactPlayer from "react-player";
// ================================================
function CurrentMedia({
  currentMedia,
}: {
  currentMedia: {
    id: string;
    mediaUrl: string;
    mediaType: string;
  };
}) {
  return (
    <>
      {currentMedia.mediaType === "IMAGE" && (
        <div className="relative size-135">
          <Image
            src={currentMedia.mediaUrl}
            alt=""
            fill
            className="object-contain"
          />
        </div>
      )}
      {currentMedia.mediaType === "VIDEO" && (
        <div className="w-[85%] h-135 rounded-2xl overflow-hidden">
          <ReactPlayer
            src={currentMedia.mediaUrl}
            width="100%"
            height="100%"
            controls
            className="object-cover"
          />
        </div>
      )}
      {currentMedia.mediaType === "PDF" && (
        <div className="w-100 h-135 rounded-xl overflow-hidden shadow">
          <PdfViewer pdfUrl={currentMedia.mediaUrl} />
        </div>
      )}
    </>
  );
}

export default CurrentMedia;
