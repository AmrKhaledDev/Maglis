import { egyptGovernorates } from "@/data/Profile/egyptGovernorates";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { Search as SearchIcon } from "lucide-react";
// =============================================================
function Search({
  searchValue,
  setSearchValue,
  setCities,
}: {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  setCities: Dispatch<SetStateAction<string[]>>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSearchCity = () => {
    if (searchValue.trim().length > 0) {
      setCities(egyptGovernorates.filter((c) => c.includes(searchValue)));
    } else inputRef.current?.focus();
  };
  useEffect(() => {
    handleSearchCity();
  }, [searchValue]);
  return (
    <div className="w-full focus-within:border-gray-50/30 mytransition flex items-center justify-between h-16 border border-gray-50/5 rounded-xl overflow-hidden bg-[#1b1e25]">
      <span className="pr-4">
        <SearchIcon className="size-4.5" />
      </span>
      <input
        ref={inputRef}
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          if (!e.target.value.trim()) setCities(egyptGovernorates);
        }}
        placeholder="ابحث عن محافظة..."
        type="text"
        className="flex-1 text-white outline-none h-full pr-3 font-medium"
      />
    </div>
  );
}

export default Search;
