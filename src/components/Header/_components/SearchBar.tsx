"use client";

import { Search } from "lucide-react";
// ============================================
function SearchBar() {
  return (
    <div className="w-190 shadow h-12 bg-black/10 rounded-full overflow-hidden border border-gray-50/10 flex items-center justify-between">
      <input
        type="text"
        placeholder="ابحث عن منشورات أو أشخاص..."
        className="w-full h-full px-4 outline-none cursor-pointer"
      />
      <span className="w-px h-[60%] bg-white/5 block" />
      <button className="mx-2 cursor-pointer">
        <Search className="size-8 p-2 mr-1 rounded-full ring ring-gray-50/10 bg-[#c5ab77]/10 mytransition shadow hover:scale-105" />
      </button>
    </div>
  );
}

export default SearchBar;
