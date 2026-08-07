"use client";
import { SearchUsersAction } from "@/actions/Search/SearchUsers.action";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { UserSearchResult } from "@/types/UserSearchResult.type";
import clsx from "clsx";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
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
      <div
        className={clsx(
          "p-3 absolute ring ring-gray-50/2 bg-gray-800 w-full rounded-2xl mt-1 shadow-2xl flex flex-col gap-2",
          {
            hidden: !searchValue.trim() || (data && data.length < 1),
          },
        )}
      >
        {data &&
          data.length > 0 &&
          data.map((user) => (
            <Link
              href={user.id === userSession.id ? "/u/profile" : `/u/${user.id}`}
              key={user.id}
              className="flex items-center gap-3 hover:bg-slate-900 mytransition"
            >
              <Image
                src={user.image || "/user.jpg"}
                alt={user.name}
                width={50}
                height={50}
                className="rounded-full object-cover size-9 shrink-0"
              />
              <div className="flex items-center gap-1.5">
                <h2 className="text-nowrap text-sm font-semibold text-gray-200">
                  {user.name}
                </h2>
                {user.id === userSession.id && (
                  <>
                    <span className="size-0.75 shadow rounded-full bg-gray-500 shrink-0" />
                    <h3 className="font-semibold text-xs text-green-600">
                      أنت
                    </h3>
                  </>
                )}
                <span className="size-0.75 shadow rounded-full bg-gray-500 shrink-0" />
                <p className="line-clamp-1 text-xs font-normal text-gray-300">
                  {user.bio}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default SearchBar;
