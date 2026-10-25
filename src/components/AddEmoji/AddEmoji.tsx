import clsx from "clsx";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { FaceSlightlySmiling } from "lucide-react";
import { RefObject, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { IconType } from "react-icons/lib";
// ======================================================================
function AddEmoji({
  textInputRef,
  emojiPickerStyle,
  style,
  Icon,
}: {
  textInputRef: RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
  emojiPickerStyle: string;
  style: string;
  Icon?: IconType;
}) {
  const { setValue, watch } = useFormContext();
  const onEmojiClick = (emojiData: EmojiClickData) => {
    const input = textInputRef.current;
    if (!input) return null;
    const start = input.selectionStart ?? 0;
    const end = input.selectionEnd ?? 0;
    const currentMessage = watch("content") ?? "";
    const before = currentMessage.slice(0, start);
    const after = currentMessage.slice(end);
    const newMessage = before + emojiData.emoji + after;
    setValue("content", newMessage);
  };
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (!e.target.closest(".buttonShowEmojiPicker, .emojiPicker"))
          setShowEmojiPicker(false);
      }
    };
    document.addEventListener("click", handle);
    return () => document.removeEventListener("click", handle);
  }, []);
  return (
    <div className="relative">
      <button
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        type="button"
        className={clsx("buttonShowEmojiPicker cursor-pointer", style)}
      >
        {Icon ? <Icon /> : <FaceSlightlySmiling className="size-full" />}
      </button>
      {showEmojiPicker && (
        <div className={clsx("absolute emojiPicker", emojiPickerStyle)}>
          <EmojiPicker
            onEmojiClick={onEmojiClick}
            searchPlaceHolder="ابحث عن ملصقات"
            previewConfig={{ showPreview: false }}
            searchDisabled={true}
            skinTonesDisabled={true}
            className="bg-black/23! rounded-2xl! backdrop-blur-2xl! border-white/5! w-full! h-full!"
          />
        </div>
      )}
    </div>
  );
}

export default AddEmoji;
