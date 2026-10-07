import { Search as SearchIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
// ==========================================================
function Search({
  searchText,
  setSearchText,
}: {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="w-full focus-within:border focus-within:border-white/30 h-10 bg-black/40 rounded-md overflow-hidden flex items-center group">
      <button className="pr-2.5 pl-2 cursor-pointer group-focus-within:cursor-default text-gray-400 ">
        <SearchIcon className="size-5" strokeWidth={1} />
      </button>
      <span className="h-6 w-[0.5px] bg-white/3 block" />
      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        type="text"
        className="w-full h-full px-2 outline-none text-sm group-focus-within:cursor-default cursor-pointer"
        placeholder="ابحث عن مستخدمين بالاسم أو اسم المستخدم أو المدينة"
      />
    </div>
  );
}

export default Search;
