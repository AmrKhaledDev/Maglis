"use client";
import { Ellipsis, Save } from "lucide-react";
import { Pencil, Pin, Link2, MessageSquareOff, Trash2 } from "lucide-react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { motion } from "framer-motion";
// =================================================
function PostOptions({
  showOptions,
  setShowOptions,
  postId,
}: {
  showOptions: string;
  setShowOptions: Dispatch<SetStateAction<string>>;
  postId: string;
}) {
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (!e.target.closest(".buttonOptions, .boxOptions"))
          setShowOptions("");
      }
    };
    document.addEventListener("click", handle);
    return () => document.removeEventListener("click", handle);
  });
  return (
    <div className="absolute top-1 left-1 ">
      <button
        onClick={() => setShowOptions((prev) => (prev == postId ? "" : postId))}
        className={`cursor-pointer mytransition buttonOptions hover:shadow p-1 rounded-full hover:bg-white/5
          ${showOptions === postId && "bg-white/5"}
          `}
      >
        <Ellipsis className="size-5" />
      </button>
      {showOptions === postId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="p-3 shadow-2xl flex boxOptions flex-col gap-2 absolute bg-gray-200 text-slate-900 rounded-2xl w-fit whitespace-nowrap z-9 left-0 font-semibold"
        >
          <button className="flex items-center gap-2 text-sm cursor-pointer hover:bg-white mytransition">
            <Pencil className="size-4.5" /> تعديل
          </button>
          <button className="flex items-center gap-2 text-sm cursor-pointer hover:bg-white mytransition">
            <Save className="size-4.5" /> حفظ
          </button>
          <button className="flex items-center gap-2 text-sm cursor-pointer hover:bg-white mytransition">
            <Pin className="size-4.5" /> تثبيت في الملف الشخصي
          </button>
          <button className="flex items-center gap-2 text-sm cursor-pointer hover:bg-white mytransition">
            <Link2 className="size-4.5" /> نسخ الرابط
          </button>
          <button className="flex items-center gap-2 text-sm cursor-pointer hover:bg-white mytransition">
            <MessageSquareOff className="size-4.5" /> إيقاف التعليقات
          </button>
          <button className="flex items-center gap-2 text-sm cursor-pointer hover:bg-white mytransition text-red-500">
            <Trash2 className="size-4.5" /> حذف
          </button>
        </motion.div>
      )}
    </div>
  );
}

export default PostOptions;
