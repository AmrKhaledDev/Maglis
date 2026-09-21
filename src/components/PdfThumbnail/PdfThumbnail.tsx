"use client";

import { Dispatch, SetStateAction } from "react";
import { TbLoader4 } from "react-icons/tb";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useResizeDetector } from "react-resize-detector";
// ==========================================================
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();
export default function PdfThumbnail({
  pdfUrl,
  setNumPages,
}: {
  pdfUrl: string;
  setNumPages?: Dispatch<SetStateAction<number>>;
}) {
  const { width, ref } = useResizeDetector();
  return (
    <div ref={ref} className="w-full h-full">
      <Document
        className="w-full h-full flex justify-center items-center"
        file={pdfUrl}
        onLoadSuccess={({ numPages }) => {
          setNumPages?.(numPages);
        }}
        loading={
          <div className="w-full h-full flex items-center  justify-center ">
            <TbLoader4 className="size-6 animate-[spin_1.5s_linear_infinite]" />
          </div>
        }
        error={
          <p className="text-red-400 text-xs font-medium">
            حدث خطأ أثناء تحميل الملف.
          </p>
        }
      >
        <Page pageNumber={1} width={width} />
      </Document>
    </div>
  );
}
