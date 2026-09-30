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
      className="flex items-center gap-2 py-2 sm:px-4 px-3 rounded-full disabled:bg-white/5 disabled:text-gray-400 not-disabled:bg-blue-800 not-disabled:hover:bg-blue-700 shadow sm:text-sm not-disabled:cursor-pointer backdrop-blur-3xl text-xs"
    >
      <IoSend className="size-5 sm:block hidden" strokeWidth={1} />
      أرسل
    </button>
  );
}

export default ButtonCreateMessage;
