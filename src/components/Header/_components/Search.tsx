"use client";
import { SearchUsersAction } from "@/actions/Search/SearchUsers.action";
import { useUser } from "@/providers/UserProvider";
import { useQuery } from "@tanstack/react-query";
import { Search as SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import UsersSearchResult from "./UsersSearchResult";
// =================================================================================
function Search() {
  const userSession = useUser();
  const [searchValue, setSearchValue] = useState("");
  const { data = [] } = useQuery({
    queryFn: async () => {
      const result = await SearchUsersAction(searchValue);
      return result.users;
    },
    queryKey: ["search_users", userSession.id, searchValue],
    enabled: searchValue.trim().length > 0,
  });
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (e.target instanceof Element)
        if (!e.target.closest(".searchBox")) setSearchValue("");
    };
    document.addEventListener("click", handle);
    return () => document.removeEventListener("click", handle);
  }, []);
  const sorting_data = data.sort((a, b) => {
    if (a.id === userSession.id) return -1;
    if (b.id === userSession.id) return 1;
    return 0;
  });
  return (
    <div className="relative">
      <div className="w-190 searchBox shadow h-12 bg-black/10 rounded-full overflow-hidden border border-gray-50/6 flex items-center justify-between">
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          placeholder="بحث..."
          className="w-full h-full px-4 outline-none cursor-pointer"
        />
        <span className="w-px h-[60%] bg-white/5 block" />
        <button className="mx-2 cursor-pointer">
          <SearchIcon className="size-8 p-2 mr-1 rounded-full ring ring-gray-50/10 bg-[#c5ab77]/10 mytransition shadow hover:scale-105" />
        </button>
      </div>
      {data.length > 0 && (
        <UsersSearchResult data={sorting_data} searchValue={searchValue} />
      )}
    </div>
  );
}

export default Search;
