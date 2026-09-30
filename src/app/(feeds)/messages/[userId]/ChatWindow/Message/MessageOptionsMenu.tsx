import { Pen, Trash } from "lucide-react";
import { motion } from "framer-motion";
import { useActiveModal } from "@/providers/ActiveModalProvider";
import { useActiveMenu } from "@/providers/ActiveMenuProvider";
import { Message } from "@prisma/client";
// ===============================================================
function MessageOptionsMenu({ message }: { message: Message }) {
  const { setActiveModal } = useActiveModal();
  const { activeMenu } = useActiveMenu();
  return (
    <>
      {activeMenu === message.id && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bgOptionsBox -left-15 boxMenu"
        >
          <button
            onClick={() => setActiveModal("edit_message" + message.id)}
            className="btnOptBox"
          >
            <Pen className="btnOptIcon" /> تعديل
          </button>
          <button
            onClick={() => setActiveModal("delete_message" + message.id)}
            className="btnOptBox text-red-600!"
          >
            <Trash className="btnOptIcon" /> حذف
          </button>
        </motion.div>
      )}
    </>
  );
}

export default MessageOptionsMenu;
