import { useFormContext } from "react-hook-form";
import AddEmoji from "../AddEmoji";
import { useRef } from "react";
// ================================================
function MessageInput() {
  const { register } = useFormContext();
  const messageInputRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...contentRegister } = register("content");
  return (
    <div className="flex items-center gap-5">
      <input
        {...contentRegister}
        ref={(element) => {
          ref(element);
          messageInputRef.current = element;
        }}
        type="text"
        placeholder="أكتب رسالتك..."
        className="bg-zinc-800/30 w-180 py-2.5 ring ring-white/5 px-4 rounded-md shadow outline-none"
      />
      <AddEmoji messageInputRef={messageInputRef} />
    </div>
  );
}

export default MessageInput;
