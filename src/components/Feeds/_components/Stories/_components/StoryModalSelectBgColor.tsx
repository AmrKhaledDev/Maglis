import { bg_colors } from "@/data/StoryModal/bg_colors";
import { Check, Palette } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
// ================================================================
function StoryModalSelectBgColor({
  selectedColor,
  setSelectedColor,
}: {
  selectedColor: string;
  setSelectedColor: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2.5">
        <Palette
          strokeWidth={1.5}
          className="p-1 size-6.5 ring ring-sky-300/30 rounded-md bg-gray-700 text-sky-500 shadow"
        />
        <h2 className="font-semibold">لون خلفية النص</h2>
      </div>
      <div className="flex items-center gap-1">
        {bg_colors.map((color) => (
          <button
            disabled={selectedColor === color}
            onClick={() => setSelectedColor(color)}
            key={color}
            style={{ backgroundColor: color }}
            className="size-6.5 rounded flex items-center justify-center not-disabled:cursor-pointer shadow not-disabled:hover:scale-105 mytransition not-disabled:active:scale-95"
          >
            {selectedColor === color && (
              <Check strokeWidth={3} className="size-3.5" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default StoryModalSelectBgColor;
