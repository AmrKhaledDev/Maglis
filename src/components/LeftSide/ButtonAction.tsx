"use client";
import clsx from "clsx";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
// ==============================================
function ButtonAction({
  name,
  style,
  id,
  icon: Icon,
  iconStyle,
}: {
  name: string;
  style: string;
  id: string;
  icon: LucideIcon;
  iconStyle?: string;
}) {
  const router = useRouter();
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      onClick={() => router.push(`/conversations/${id}`)}
      whileTap={{ scale: 0.9 }}
      className={clsx(
        "py-2 px-4 bg-white/5 rounded-full shadow cursor-pointer font-medium flex items-center gap-1.5",
        style,
      )}
    >
      <Icon strokeWidth={1.5} className={iconStyle} /> {name}
    </motion.button>
  );
}

export default ButtonAction;
