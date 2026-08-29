"use client";
import clsx from "clsx";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
// ==============================================
function ActionButton({
  name,
  textStyle,
  icon: Icon,
}: {
  name: string;
  textStyle: string;
  icon: LucideIcon;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{scale:0.9}}
      className={clsx(
        "text-[11px] py-2 px-4 bg-white/5 rounded-full shadow cursor-pointer font-medium flex items-center gap-1.5",
        textStyle,
      )}
    >
      <Icon strokeWidth={1.5} className="size-3.5" /> {name}
    </motion.button>
  );
}

export default ActionButton;
