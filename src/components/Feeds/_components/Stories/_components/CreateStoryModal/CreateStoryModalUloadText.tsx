import clsx from "clsx";
import { ALargeSmall } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import TextareaAutoSize from "react-textarea-autosize";
// =====================================================
function CreateStoryModalUloadText({
  selectedColor,
  setContentText,
  contentText,
}: {
  selectedColor: string;
  setContentText: Dispatch<SetStateAction<string>>;
  contentText: string;
}) {
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
        onChange={(e) => setContentText(e.target.value)}
        value={contentText}
        style={{ backgroundColor: selectedColor }}
        placeholder="أكتب شيئًا..."
        minRows={3}
        maxRows={6}
        className="font-medium placeholder-gray-100 w-full text-sm rounded-md p-2  mytransition resize-none outline-none"
      />
      <p className="font-semibold flex items-center gap-1 text-sm">
        500 /
        <span
          className={clsx(
            contentText.length > 500 ? "text-red-500" : "text-green-500",
          )}
        >
          {contentText.length}
        </span>
      </p>
    </div>
  );
}

export default CreateStoryModalUloadText;
