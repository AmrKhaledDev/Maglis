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
      preview: string;
      open: boolean;
    }>
  >;
  showMedia: {
    preview: string;
    open: boolean;
  };
}) {
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (!e.target.closest(".mediaPreview"))
          setShowMedia((prev) => ({ open: false, preview: "" }));
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
        <Image
          src={showMedia.preview || "/user.jpg"}
          alt="صورة المنشور"
          fill
          className="object-contain z-20 rounded-xl"
        />
        <Image
          src={showMedia.preview || "/user.jpg"}
          alt="صورة المنشور"
          fill
          className="object-top blur opacity-30"
        />
      </motion.div>
    </div>,
    document.body,
  );
}

export default MediaPreviewModal;
