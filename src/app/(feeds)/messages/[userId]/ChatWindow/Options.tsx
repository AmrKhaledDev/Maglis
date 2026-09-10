"use client";
import BlockButton from "@/components/BlockButton/BlockButton";
import { useActiveMenu } from "@/providers/ActiveMenuProvider";
import { User } from "@prisma/client";
import clsx from "clsx";
import { motion } from "framer-motion";
import {
  EllipsisVertical,
  Eraser,
  MessageSquareLock,
  Trash2,
} from "lucide-react";
import Link from "next/link";
// ======================================================
function Options({ receiver }: { receiver: User }) {
  const { activeMenu, setActiveMenu } = useActiveMenu();
  return (
    <div className="relative">
      <motion.button
        onClick={() => setActiveMenu("chatWindow_options")}
        whileTap={{ scale: 0.9 }}
        className={clsx(
          "text-xl h-fit cursor-pointer p-1.5 rounded-full shadow btnActiveMenu",
          activeMenu === "chatWindow_options"
            ? "bg-white/3"
            : "hover:bg-white/3 hover:ring ring-white/5",
        )}
      >
        <EllipsisVertical className="size-5" />
      </motion.button>
      {activeMenu === "chatWindow_options" && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bgOptionsBox min-w-40! boxMenu"
        >
          <h2 className="text-[10px] text-gray-400 mb-1.5">خصائص الدردشة</h2>
          <button className="btnOptBox">
            <Trash2 className="btnOptIcon" />
            حذف الدردشه
          </button>
          <button className="btnOptBox">
            <Eraser className="btnOptIcon" />
            مسح الرسائل
          </button>
          <Link href={"/"} className="btnOptBox">
            <MessageSquareLock className="btnOptIcon" />
            إغلاق الدردشة
          </Link>
          <hr className="border-white/5" />
          <BlockButton authorId={receiver.id} />
        </motion.div>
      )}
    </div>
  );
}

export default Options;
