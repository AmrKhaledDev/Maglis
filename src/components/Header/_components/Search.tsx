"use client";
import { SearchUsersAction } from "@/actions/Search/SearchUsers.action";
import { useUser } from "@/providers/UserProvider";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import UsersSearchResult from "./UsersSearchResult";
import { X } from "lucide-react";
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
      <div className="w-100 focus-within:w-130 mytransition searchBox shadow h-11 bg-white/3 rounded-full overflow-hidden flex items-center justify-between">
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          placeholder="بحث سريع عن مستخدمين"
          className="w-full h-full px-4 outline-none cursor-pointer font-light"
        />
        {searchValue.trim().length > 0 && (
          <button
            onClick={() => setSearchValue("")}
            className="pl-3 text-gray-400 hover:text-white cursor-pointer"
          >
            <X strokeWidth={1} className="size-4" />
          </button>
        )}
      </div>
      {data.length > 0 && (
        <UsersSearchResult data={sorting_data} searchValue={searchValue} />
      )}
    </div>
  );
}

export default Search;
