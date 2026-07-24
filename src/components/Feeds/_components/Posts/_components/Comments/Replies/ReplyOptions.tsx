import { Copy, Ellipsis, Pencil, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useActiveMenu } from "@/providers/ActiveMenuProvider";
import { CommentDbType } from "@/types/Comment.type";
import { useEffect } from "react";
// ==================================================================
function ReplyOptions({ reply }: { reply: CommentDbType }) {
  const { activeMenu, setActiveMenu } = useActiveMenu();
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (!e.target.closest(".btnActiveMenu, .boxMenu")) setActiveMenu("");
      }
    };
    document.addEventListener("click", handle);
    return () => removeEventListener("click", handle);
  }, []);
  return (
    <div className="relative">
      <button
        onClick={() =>
          setActiveMenu((prev) => (prev == reply.id ? "" : reply.id))
        }
        className={`cursor-pointer btnActiveMenu text-slate-300 h-fit hover:bg-white/5 mytransition hover:shadow butonShowCommentOptions rounded-full p-0.5`}
      >
        <Ellipsis className="size-3" strokeWidth={1.5} />
      </button>
      {activeMenu == reply.id && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bgOptionsBox rounded-lg w-25 boxMenu"
        >
          <button className="flex items-center gap-2 text-[11px] hover:bg-white mytransition cursor-pointer">
            <Pencil className="size-4" /> تعديل
          </button>
          <button className="flex items-center gap-2 text-[11px] not-disabled:hover:bg-white mytransition not-disabled:cursor-pointer">
            <Copy className="size-4" /> نسخ النص
          </button>
          <hr className=" border-zinc-700 opacity-8" />
          <button className="flex items-center gap-2 text-[11px] not-disabled:hover:bg-white mytransition not-disabled:cursor-pointer text-red-600">
            <Trash2 className="size-4" /> حذف
          </button>
        </motion.div>
      )}
    </div>
  );
}

export default ReplyOptions;
