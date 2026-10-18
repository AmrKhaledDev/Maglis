import { Search as SearchIcon, X } from "lucide-react";
import { Dispatch, SetStateAction, useRef } from "react";
// ================================================================
function Search({
  searchText,
  setSearchText,
}: {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const click = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  };
  return (
    <div className="bg-white/3 ring ring-white/5 h-14 shadow focus-within:ring-white/12 w-full rounded-lg flex items-center gap-3.5">
      <button onClick={click} className="pr-5 opacity-40">
        <SearchIcon className="size-5.5" strokeWidth={2} />
      </button>
      <span className="h-1/2 w-px bg-white/4" />
      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        ref={inputRef}
        type="text"
        placeholder="ابحث عن أشخاص أو منشورات"
        className="text-xl font-normal outline-none flex-1 h-full cursor-pointer"
      />
      {searchText.length > 0 && (
        <button
          className="pl-2 cursor-pointer text-gray-400 hover:text-white"
          onClick={() => setSearchText("")}
        >
          <X className="size-4" strokeWidth={1.5} />
        </button>
      )}
    </div>
  );
}

export default Search;
