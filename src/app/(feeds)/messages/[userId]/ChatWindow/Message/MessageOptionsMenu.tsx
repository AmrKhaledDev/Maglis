import { Pen, Trash } from "lucide-react";
import { motion } from "framer-motion";
import { useActiveModal } from "@/providers/ActiveModalProvider";
// ===============================================================
function MessageOptionsMenu({messageId}:{messageId:string}) {
  const { setActiveModal } = useActiveModal();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bgOptionsBox -left-15 boxMenu"
    >
      <button
        onClick={() => setActiveModal("edit_message")}
        className="btnOptBox"
      >
        <Pen className="btnOptIcon" /> تعديل
      </button>
      <button
        onClick={() => setActiveModal(messageId)}
        className="btnOptBox text-red-600!"
      >
        <Trash className="btnOptIcon" /> حذف
      </button>
    </motion.div>
  );
}

export default MessageOptionsMenu;
