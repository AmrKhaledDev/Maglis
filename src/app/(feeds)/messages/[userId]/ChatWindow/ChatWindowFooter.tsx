import { BsEmojiGrin } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { IoSend } from "react-icons/io5";
// ======================================
function ChatWindowFooter() {
  return (
    <div className="h-23 flex items-center gap-3 justify-center">
      <button className="flex items-center gap-2 py-2 px-4 rounded-full bg-white/5 text-gray-400 hover:bg-blue-700 shadow text-sm cursor-pointer font-medium ">
        <IoSend />
        أرسل
      </button>
      <input
        className="border border-white/3 shadow bg-black/30 py-3 rounded-full w-[80%] px-5 outline-none"
        type="text"
        placeholder="أكتب رسالتك هنا. . ."
      />
      <div className="flex items-center gap-2.5">
        <button className="p-2 rounded-full shadow bg-white/5 text-gray-400 text-xl cursor-pointer">
          <BsEmojiGrin />
        </button>
        <button className="p-2 rounded-full shadow bg-white/5 text-gray-400 text-xl cursor-pointer">
          <FiPlus />
        </button>
      </div>
    </div>
  );
}

export default ChatWindowFooter;
