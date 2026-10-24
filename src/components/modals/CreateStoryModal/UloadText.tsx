import AddEmoji from "@/components/AddEmoji/AddEmoji";
import clsx from "clsx";
import { ALargeSmall } from "lucide-react";
import { useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import TextareaAutoSize from "react-textarea-autosize";
import CreateStoryFormValues from "./_types/CreateStoryFormValues.type";
// =====================================================
function UloadText({ selectedColor }: { selectedColor: string }) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { register, control } = useFormContext<CreateStoryFormValues>();
  const content = useWatch({
    control,
    name: "content",
    defaultValue: "",
  });
  const { ref, ...currentRegister } = register("content");
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2.5">
        <ALargeSmall
          strokeWidth={1.5}
          className="p-1 size-6.5 ring ring-sky-300/30 rounded-md bg-gray-700 text-sky-500 shadow"
        />
        <h2 className="font-semibold">نص</h2>
      </div>
      <div className="flex flex-col gap-2">
        <TextareaAutoSize
          {...currentRegister}
          ref={(element) => {
            ref(element);
            textareaRef.current = element;
          }}
          style={{ backgroundColor: selectedColor }}
          placeholder="أكتب شيئًا..."
          minRows={3}
          maxRows={6}
          className="font-medium placeholder-gray-100 w-full text-sm rounded-md p-2  mytransition resize-none outline-none"
        />
        <div className="relative">
          <AddEmoji
            textInputRef={textareaRef}
            emojiPickerStyle="h-100 bottom-10 left-20"
          />
        </div>
      </div>
      <p className="font-semibold flex items-center gap-1 text-sm">
        500 /
        <span
          className={clsx(
            content.length > 500 ? "text-red-500" : "text-green-500",
          )}
        >
          {content.length}
        </span>
      </p>
    </div>
  );
}

export default UloadText;
