import { LuMessageSquareText, LuSearch } from "react-icons/lu";
// =============================================================
function SearhBar() {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-white/3 h-10 rounded-md overflow-hidden flex items-center w-full gap-2 ring ring-gray-50/5">
        <button className="text-xl text-gray-600 pr-2">
          <LuSearch />
        </button>
        <input
          className="h-full w-full outline-none text-gray-400"
          type="text"
          placeholder="بحث..."
        />
      </div>
      <button className="p-2.5 h-10 text-gray-400 bg-white/3 ring ring-gray-50/5 rounded-md shadow text-xl cursor-pointer">
        <LuMessageSquareText />
      </button>
    </div>
  );
}

export default SearhBar;
