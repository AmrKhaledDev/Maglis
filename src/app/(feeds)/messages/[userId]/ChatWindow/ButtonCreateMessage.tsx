import { IoSend } from "react-icons/io5";
// =========================================
function ButtonCreateMessage({
  content,
  isPending,
}: {
  content: string | undefined;
  isPending: boolean;
}) {
  return (
    <button
      disabled={!content?.trim() || isPending}
      type="submit"
      className="flex items-center gap-2 py-2 px-4 rounded-full disabled:bg-white/5 disabled:text-gray-400 not-disabled:bg-blue-800 not-disabled:hover:bg-blue-700 shadow text-sm not-disabled:cursor-pointer font-medium backdrop-blur-3xl"
    >
      <IoSend />
      أرسل
    </button>
  );
}

export default ButtonCreateMessage;
