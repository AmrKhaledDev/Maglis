import clsx from "clsx";
import ActiveDataType from "../_types/ActiveData.type";
import { Dispatch, SetStateAction } from "react";
import { UserSearchResult } from "@/types/UserSearchResult.type";
import { Post } from "@/types/Post.type";
// =============================
function SearchTypeTabs({
  activeData,
  setActiveData,
  data,
}: {
  activeData: ActiveDataType;
  setActiveData: Dispatch<SetStateAction<ActiveDataType>>;
  data: {
    users: UserSearchResult[];
    posts: Post[];
  };
}) {
  const tabs = [
    {
      value: "ALL",
      label: "الكل",
      dataLength: data.users.length + data.posts.length,
    },
    { value: "USERS", label: "الأشخاص", dataLength: data.users.length },
    { value: "POSTS", label: "المنشورات", dataLength: data.posts.length },
  ] as const;
  return (
    <div className="flex bg-white/2 items-center gap-2 w-fit rounded-lg p-2 overflow-hidden">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => setActiveData(tab.value)}
          className={clsx(
            "py-2 rounded-lg font-normal px-4 flex items-center gap-3 shadow-lg hover:bg-white hover:text-black mytransition",
            activeData == tab.value
              ? "bg-white text-black"
              : "text-white cursor-pointer ",
          )}
        >
          {tab.label}
          <span className="text-xs font-semibold">{tab.dataLength}</span>
        </button>
      ))}
    </div>
  );
}

export default SearchTypeTabs;
