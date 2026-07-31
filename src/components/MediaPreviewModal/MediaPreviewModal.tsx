"use client";

import Image from "next/image";
import { Dispatch, SetStateAction, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
// =======================================================================
function MediaPreviewModal({
  setShowMedia,
  showMedia,
}: {
  setShowMedia: Dispatch<
    SetStateAction<{
      mediaType: string;
      preview: string;
      open: boolean;
    }>
  >;
  showMedia: {
    mediaType: string;
    preview: string;
    open: boolean;
  };
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
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur z-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative w-250 h-150 bg-black rounded-xl overflow-hidden mediaPreview"
      >
        {showMedia.mediaType == "image" && (
          <>
            <Image
              src={showMedia.preview}
              alt="صورة المنشور"
              fill
              className="object-contain z-20 rounded-xl"
            />
            <Image
              src={showMedia.preview}
              alt="صورة المنشور"
              fill
              className="object-cover blur opacity-20"
            />
          </>
        )}
        {showMedia.mediaType == "video" && (
          <video src={showMedia.preview} className="w-full h-full" controls />
        )}
      </motion.div>
    </div>,
    document.body,
  );
}

export default MediaPreviewModal;
