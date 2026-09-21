import { egyptGovernorates } from "@/data/Profile/egyptGovernorates";
import { Dispatch, SetStateAction, useRef } from "react";
// =============================================================
function SelectCitySearchbar({
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
  return (
    <div className="w-full focus-within:border-gray-50/30 mytransition flex items-center justify-between h-10 border border-gray-50/10 rounded-xl overflow-hidden">
      <input
        ref={inputRef}
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          if (!e.target.value.trim()) setCities(egyptGovernorates);
        }}
        placeholder="أبحث عن محافظتك.."
        type="text"
        className="flex-1 text-white outline-none h-full pr-3 placeholder:text-gray-300 text-sm"
      />
      <button
        onClick={handleSearchCity}
        type="button"
        className="h-full text-sm hover:shadow hover:bg-slate-800 mytransition bg-slate-900 w-20 cursor-pointer text-white"
      >
        بحث
      </button>
    </div>
  );
}

export default SelectCitySearchbar;
