import PdfThumbnail from "@/components/PdfThumbnail/PdfThumbnail";
import formatFileSize from "@/formats/formatFileSize";
import { MessageMedia } from "@prisma/client";
import clsx from "clsx";
import { useState } from "react";
import { FaFilePdf } from "react-icons/fa6";
// =========================================================================
function PdfCard({
  media,
  mediaLength,
}: {
  media: MessageMedia;
  mediaLength: number;
}) {
  const [numPages, setNumPages] = useState(0);
  return (
    <>
      {media.mediaType === "PDF" && (
        <div
          className={clsx(
            "relative overflow-hidden",
            mediaLength > 1 ? "size-80" : "w-100 h-50  ",
          )}
        >
          <PdfThumbnail setNumPages={setNumPages} pdfUrl={media.mediaUrl} />
          <div className="absolute bg-black/90 bottom-0 w-full backdrop-blur-3xl h-20 z-20 p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <FaFilePdf className="size-8 text-[#b50934]" />
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-semibold">
                  {media.mediaName.split(".")[0]}
                </h3>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-gray-300">{numPages} صفحات</p>
                  <p className="text-xs text-gray-300">PDF</p>
                  <p className="text-xs text-gray-300">
                    {formatFileSize(media.mediaSize)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PdfCard;
