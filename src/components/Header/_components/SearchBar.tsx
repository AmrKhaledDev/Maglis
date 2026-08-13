"use client";
import { SearchUsersAction } from "@/actions/Search/SearchUsers.action";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { UserSearchResult } from "@/types/UserSearchResult.type";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import UsersSearchResult from "./UsersSearchResult";
// ============================================
function SearchBar() {
  const userSession = useUser();
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState<UserSearchResult[] | null>(null);
  const { setToast } = useToast();
  useEffect(() => {
    const FETCH_DATA = async () => {
      if (!searchValue.trim()) return;
      const result = await SearchUsersAction(searchValue);
      if (!result.success && result.messaage)
        return setToast({
          open: true,
          message: result.messaage,
          type: "error",
        });
      setData(result.users || []);
    };
    FETCH_DATA();
  }, [searchValue]);
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (e.target instanceof Element)
        if (!e.target.closest(".searchBox")) setSearchValue("");
    };
    document.addEventListener("click", handle);
    return () => document.removeEventListener("click", handle);
  }, []);
  data &&
    data.sort((a, b) => {
      if (a.id === userSession.id) return -1;
      if (b.id === userSession.id) return 1;
      return 0;
    });
  return (
    <div className="relative">
      <div className="w-190 searchBox shadow h-12 bg-black/10 rounded-full overflow-hidden border border-gray-50/10 flex items-center justify-between">
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          placeholder="بحث..."
          className="w-full h-full px-4 outline-none cursor-pointer"
        />
        <span className="w-px h-[60%] bg-white/5 block" />
        <button className="mx-2 cursor-pointer">
          <Search className="size-8 p-2 mr-1 rounded-full ring ring-gray-50/10 bg-[#c5ab77]/10 mytransition shadow hover:scale-105" />
        </button>
      </div>
      <UsersSearchResult data={data} searchValue={searchValue} />
    </div>
  );
}

export default SearchBar;
