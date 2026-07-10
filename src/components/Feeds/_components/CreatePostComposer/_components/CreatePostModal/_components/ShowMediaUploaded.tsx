"use client";

import Image from "next/image";
import { Dispatch, SetStateAction, useEffect } from "react";
import { createPortal } from "react-dom";
// ===========================================
function ShowMediaUploaded({
  mediaType,
  preview,
  setShowMedia,
}: {
  mediaType: "image" | "video";
  preview: string;
  setShowMedia: Dispatch<
    SetStateAction<{
      mediaType: string;
      preview: string;
      open: boolean;
    }>
  >;
}) {
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (!e.target.closest(".media, .mediaPreview"))
          setShowMedia((prev) => ({ ...prev, open: false }));
      }
    };
    document.addEventListener("click", handle);
    return () => document.removeEventListener("click", handle);
  }, []);
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur z-50">
      <div className="relative w-230 h-130 bg-black rounded-2xl overflow-hidden mediaPreview">
        {mediaType == "image" && (
          <Image
            src={preview}
            alt="صورة المنشور"
            fill
            className="object-contain"
          />
        )}
        {mediaType == "video" && (
          <video src={preview} className="w-full h-full" controls />
        )}
      </div>
    </div>,
    document.body,
  );
}

export default ShowMediaUploaded;
