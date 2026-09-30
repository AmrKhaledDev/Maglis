"use client";
import clsx from "clsx";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
// ==============================================
function ButtonAction({
  name,
  textStyle,
  icon: Icon,
  id,
}: {
  name: string;
  textStyle: string;
  icon: LucideIcon;
  id: string;
}) {
  const router = useRouter();
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      onClick={()=>router.push(`/messages/${id}`)}
      whileTap={{ scale: 0.9 }}
      className={clsx(
        "text-[11px] py-2 px-4 bg-white/5 rounded-full shadow cursor-pointer font-medium flex items-center gap-1.5",
        textStyle,
      )}
    >
      <Icon strokeWidth={1.5} className="size-3.5" /> {name}
    </motion.button>
  );
}

export default ButtonAction;
