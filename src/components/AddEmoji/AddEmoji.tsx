import clsx from "clsx";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { RefObject, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { BsFillEmojiHeartEyesFill } from "react-icons/bs";
// ======================================================================
function AddEmoji({
  textInputRef,
  emojiPickerStyle,
  style,
}: {
  textInputRef: RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
  emojiPickerStyle: string;
  style?: string;
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
        className={clsx(
          showEmojiPicker && "text-white!",
          "buttonShowEmojiPicker",
          style
            ? style
            : "p-2 rounded-full shadow bg-white/5 text-gray-400 text-xl cursor-pointer hover:scale-102 active:bg-white/10 ",
        )}
      >
        <BsFillEmojiHeartEyesFill className="sm:size-5 size-4" />
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
