import { ALargeSmall } from "lucide-react";
import TextareaAutoSize from "react-textarea-autosize";
// =====================================================
function StoryModalUloadText({selectedColor}:{selectedColor:string}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2.5">
        <ALargeSmall
          strokeWidth={1.5}
          className="p-1 size-6.5 ring ring-sky-300/30 rounded-md bg-gray-700 text-sky-500 shadow"
        />
        <h2 className="font-semibold">نص</h2>
      </div>
      <TextareaAutoSize
        style={{ backgroundColor: selectedColor }}
        placeholder="أكتب شيئًا..."
        minRows={3}
        maxRows={6}
        className="font-medium placeholder-gray-100 w-full text-sm rounded-md p-2  mytransition resize-none outline-none"
      />
    </div>
  );
}

export default StoryModalUloadText;
