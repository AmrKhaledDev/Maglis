"use client";

import Image from "next/image";
import { Dispatch, SetStateAction, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
// =======================================================================
function ImagePreviewModal({
  setShowImage,
  showImage,
}: {
  setShowImage: Dispatch<
    SetStateAction<{
      open: boolean;
      url: string;
    }>
  >;
  showImage: {
    open: boolean;
    url: string;
  };
}) {
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (!e.target.closest(".mediaPreview"))
          setShowImage({ open: false, url: "" });
      }
    };
    document.addEventListener("click", handle);
    return () => document.removeEventListener("click", handle);
  }, []);
  if (!showImage.url) return null;
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-white/7 backdrop-blur z-100">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative w-300 h-180 bg-black rounded-xl overflow-hidden mediaPreview"
      >
        <Image
          src={showImage.url}
          alt="صورة المنشور"
          fill
          className="object-contain z-20 rounded-xl"
        />
        <Image
          src={showImage.url}
          alt="صورة المنشور"
          fill
          className="object-top blur opacity-30"
        />
      </motion.div>
    </div>,
    document.body,
  );
}

export default ImagePreviewModal;
