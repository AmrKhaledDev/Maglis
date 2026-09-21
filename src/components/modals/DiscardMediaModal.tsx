import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { UseFieldArrayRemove, useFormContext } from "react-hook-form";
// ===========================================
function DiscardMediaModal({
  setShowDiscardMediaModal,
  remove,
}: {
  setShowDiscardMediaModal: Dispatch<SetStateAction<boolean>>;
  remove: UseFieldArrayRemove;
}) {
  const { setValue } = useFormContext();
  return (
    <div className="fixed inset-0 z-200 bg-black/50 flex items-center justify-center backdrop-blur-[3px]">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.1 }}
        className="bg-[#1D1F1F] w-120 p-5 rounded-2xl shadow-lg space-y-7 "
      >
        <h1 className="text-sm">هل تريد تجاهل إرسال وسائط؟</h1>
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => setShowDiscardMediaModal(false)}
            className="p-3 rounded-full hover:bg-[#7765471d] hover:shadow-lg cursor-pointer font-medium text-xs"
          >
            إلغاء
          </button>
          <button
            onClick={() => {
              remove();
              setValue("content", "");
            }}
            className="py-3 px-6 rounded-full shadow-lg cursor-pointer bg-[#776547] hover:bg-[#776547d4] font-medium text-xs"
          >
            تجاهل
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default DiscardMediaModal;
