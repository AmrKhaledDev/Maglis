import { IoIosSend } from "react-icons/io";
import { motion } from "framer-motion";
// =========================================
function ButtonCreateMessage({
  content,
  isPending,
}: {
  content: string | undefined;
  isPending: boolean;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      disabled={!content?.trim() || isPending}
      type="submit"
      className="flex items-center active:scale-95 gap-2 py-3 sm:px-4 px-3 rounded-full bg-linear-to-t from-[#63543a] to-[#b69e73] shadow-lg font-medium sm:text-sm cursor-pointer backdrop-blur-3xl text-xs"
    >
      أرسل
      <IoIosSend className="text-[18px]" />
    </motion.button>
  );
}

export default ButtonCreateMessage;
