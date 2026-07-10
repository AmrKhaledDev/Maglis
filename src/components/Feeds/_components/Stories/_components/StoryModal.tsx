"use client";

import { ArrowUpFromLine, Check, Sparkles, TextAlignEnd } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
// =================================================
function StoryModal({
  modal,
  setModal,
}: {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
}) {
  const bg_colors = [
    "#4f46e5",
    "#7c3aed",
    "#db2777",
    "#e11d48",
    "#ca8a04",
    "#0d9488",
    "#000000",
    "#f97316",
    "#16a34a",
    "#0284c7",
    "#9333ea",
    "#b91c1c",
    "#14b8a6",
    "#facc15",
    "#f43f5e",
    "#c5ab77",
  ];
  const [selectedColor, setSelectedColor] = useState("#c5ab77");
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (!e.target.closest(".boxCreateStory, .buttonShowModal")) setModal(false);
      }
    };
    document.addEventListener("click", handle);
    return () => document.removeEventListener("click", handle);
  }, []);
  return (
    <>
      {modal && (
        <div className="fixed inset-0 backdrop-blur-xl bg-black/5 z-20 flex items-center justify-center">
          <div className="min-h-50 w-130 boxCreateStory flex flex-col gap-3 p-3">
            <textarea
              style={{ backgroundColor: selectedColor }}
              placeholder="ما هي حالتك اليوم؟"
              className="h-80 shrink-0 bg-blue-600 w-full rounded p-3 placeholder:text-gray-50 resize-none shadow outline-none"
            />
            <div className="flex items-center gap-1">
              {bg_colors.map((color) => (
                <button
                  disabled={selectedColor === color}
                  onClick={() => setSelectedColor(color)}
                  key={color}
                  style={{ backgroundColor: color }}
                  className={`size-7 disabled:scale-110 disabled:active:scale-110 disabled:hover:scale-110 rounded-full flex hover:scale-105 active:scale-95 mytransition items-center justify-center shadow mx-auto cursor-pointer ring`}
                >
                  {selectedColor === color && (
                    <Check strokeWidth={2.5} className="size-4" />
                  )}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button className="flex-1 flex items-center justify-center bg-black cursor-pointer rounded-lg py-2 shadow">
                <TextAlignEnd strokeWidth={2.5} />
              </button>
              <button className="flex-1 flex items-center gap-3 justify-center bg-cyan-700 py-2 cursor-pointer shadow rounded-lg">
                رفع صورة / فيديو
                <ArrowUpFromLine
                  strokeWidth={2.5}
                  className="size-6 text-black bg-white p-1 rounded-full shadow"
                />
              </button>
            </div>
            <button className="bg-[#96835b] shadow py-4 text-[18px] rounded-lg hover:shadow-[0_0_10px_#c5ab77] hover:bg-[#c5ab77] mytransition cursor-pointer font-semibold flex items-center gap-3 justify-center">
              حالة جديدة <Sparkles className="size-6" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default StoryModal;
