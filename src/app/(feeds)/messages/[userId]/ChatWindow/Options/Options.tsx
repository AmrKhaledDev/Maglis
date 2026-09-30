"use client";
import BlockButton from "@/components/BlockButton/BlockButton";
import { useActiveMenu } from "@/providers/ActiveMenuProvider";
import { User } from "@prisma/client";
import clsx from "clsx";
import { motion } from "framer-motion";
import { EllipsisVertical, MessageSquareLock } from "lucide-react";
import Link from "next/link";
import ClearingMessagesButton from "../ClearingMessagesButton";
import useIsUserBlocked from "@/hooks/useIsUserBlocked";
// ============================================================================
function Options({ receiver }: { receiver: User }) {
  const { activeMenu, setActiveMenu } = useActiveMenu();
  const isBlocked = useIsUserBlocked(receiver.id);
  return (
    <div className="relative">
      <motion.button
        onClick={() => setActiveMenu("options")}
        whileTap={{ scale: 0.9 }}
        className={clsx(
          "text-xl h-fit cursor-pointer p-1.5 rounded-full shadow btnActiveMenu",
          activeMenu === "options"
            ? "bg-white/3"
            : "hover:bg-white/3 hover:ring ring-white/5",
        )}
      >
        <EllipsisVertical strokeWidth={1} className="sm:size-5 size-4" />
      </motion.button>
      {activeMenu === "options" && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bgOptionsBox min-w-40! boxMenu"
        >
          <h2 className="text-[11px] text-gray-400 mb-1.5 font-light">خصائص الدردشة</h2>
          <ClearingMessagesButton
            receiverId={receiver.id}
            buttonStyle="btnOptBox"
            iconSize="btnOptIcon"
          />
          <Link href={"/"} className="btnOptBox">
            <MessageSquareLock className="btnOptIcon" />
            إغلاق الدردشة
          </Link>
          <hr className="border-white/5" />
          <BlockButton
            userId={receiver.id}
            style={`btnOptBox ${
              isBlocked
                ? "text-green-700 hover:text-green-700!"
                : "text-red-700 hover:text-red-700!"
            }`}
            iconSize="btnOptIcon"
          />
        </motion.div>
      )}
    </div>
  );
}

export default Options;
