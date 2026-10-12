import ActiveTabUserFriends from "@/components/UserProfile/_types/ActiveTabUserFriends.type";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
// ================================================================================
function Tabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: ActiveTabUserFriends;
  setActiveTab: Dispatch<SetStateAction<ActiveTabUserFriends>>;
}) {
  const tabs = [
    { label: "الأصدقاء", value: "FRIENDS" },
    { label: "المتابعين", value: "FOLLOWERS" },
    { label: "المتابعات", value: "FOLLOWINGS" },
  ] as const;
  return (
    <div className="flex items-center gap-15 justify-center mx-10">
      {tabs.map((tab) => (
        <button
          onClick={() => setActiveTab(tab.value)}
          key={tab.value}
          className={clsx(
            "px-4 text-[17px] pb-2 text-[#797979] cursor-pointer hover:text-white",
            activeTab === tab.value && "border-b text-white",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
