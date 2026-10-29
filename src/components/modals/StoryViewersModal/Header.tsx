import { X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { StoryViewer } from "./_types/StoryViewer.type";
// ==============================================================
function Header({
  isPending,
  data,
  setShowStoryViewers,
}: {
  isPending: boolean;
  data: StoryViewer[];
  setShowStoryViewers: Dispatch<SetStateAction<string>>;
}) {
  return (
    <header className="flex items-center justify-between border-b border-b-white/3 pb-3">
      <h2 className="flex-1 text-[19px] flex items-center gap-1.5 font-light justify-center">
        شاهدها
        <span className="text-[15px]">
          {isPending ? (
            <span className="w-5 h-1 bg-white/5 shadow rounded-full animate-pulse block" />
          ) : (
            <>( {data.length} )</>
          )}
        </span>
      </h2>
      <button
        onClick={() => setShowStoryViewers("")}
        className="cursor-pointer text-gray-400 hover:text-white"
      >
        <X strokeWidth={1} className="size-5" />
      </button>
    </header>
  );
}

export default Header;
