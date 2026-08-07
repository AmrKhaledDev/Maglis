"use client";

import { SendHorizontal } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { motion } from "framer-motion";
import StoryModalHeader from "./StoryModalHeader";
import StoryModalUploadMedia from "./StoryModalUploadMedia";
import StoryModalUloadText from "./StoryModalUloadText";
import StoryModalSelectBgColor from "./StoryModalSelectBgColor";
// ============================================================================
function StoryModal({
  setShowModal,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [selectedColor, setSelectedColor] = useState("#4f46e5");
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 backdrop-blur-xl bg-black/5 z-30 flex items-center justify-center"
    >
      <div className="overflow-y-auto w-200 rounded-2xl bg-slate-800 flex flex-col gap-7 p-3">
        <StoryModalHeader setShowModal={setShowModal}/>
        <div className="flex flex-col gap-5">
          <StoryModalUploadMedia />
          <StoryModalUloadText selectedColor={selectedColor} />
          <StoryModalSelectBgColor
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
        </div>
        <hr className="border-white/5" />
        <div className="flex items-center justify-between">
          <button className="flex text-sm items-center font-semibold gap-3 py-2.5 bg-sky-700 px-8 cursor-pointer shadow rounded-lg hover:outline outline-sky-600 outline-offset-2">
            <SendHorizontal className="size-5" />
            نشر القصة
          </button>
          <button
            onClick={() => setShowModal(false)}
            className="py-2.5 px-7 border-white/15 hover:scale-103 text-sm active:scale-95 font-semibold mytransition text-gray-200 border rounded-lg bg-gray-900 shadow cursor-pointer"
          >
            إلغاء
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default StoryModal;
