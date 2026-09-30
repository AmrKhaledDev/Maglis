import PdfThumbnail from "@/components/PdfThumbnail/PdfThumbnail";
import formatFileSize from "@/formats/formatFileSize";
import { MessageMedia } from "@prisma/client";
import clsx from "clsx";
import { Download } from "lucide-react";
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
            mediaLength > 1
              ? "xl:size-80 md:size-58 sm:size-80 size-70"
              : "xl:w-100 xl:h-70 sm:size-80 size-70",
          )}
        >
          <PdfThumbnail setNumPages={setNumPages} pdfUrl={media.mediaUrl} />
          <div className="absolute bg-black bottom-0 w-full backdrop-blur-3xl h-20 z-20 p-4 flex items-center justify-between">
            <div className="flex items-center gap-4 w-full">
              <FaFilePdf className="size-8 text-[#b50934]" />
              <div className="flex flex-col gap-1 w-full">
                <h3 className="text-[17px] font-semibold [word-break:break-word] line-clamp-1">
                  {media.mediaName.split(".")[0]}
                </h3>
                <div className="flex items-center gap-2 justify-between w-full flex-wrap">
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-gray-300">{numPages} صفحات</p>
                    <p className="text-xs text-gray-300">PDF</p>
                    <p className="text-xs text-gray-300">
                      {formatFileSize(media.mediaSize)}
                    </p>
                  </div>
                  <a
                    href={media.mediaUrl}
                    className="cursor-pointer text-gray-400 hover:text-white"
                  >
                    <Download strokeWidth={1.5} className="size-5" />
                  </a>
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
