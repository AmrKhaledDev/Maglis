import { tabsButtons } from "@/data/UserProfile/TabsButtonn";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import { ActiveTab } from "../../_types/ActiveTab.type";
// ====================================================
function TabsButtons({
  activeTab,
  setActiveTab,
}: {
  activeTab: ActiveTab;
  setActiveTab: Dispatch<SetStateAction<ActiveTab>>;
}) {
  return (
    <div className="flex flex-col gap-3 h-fit sticky top-25 w-fit">
      {tabsButtons(activeTab).map((tabBtn) => (
        <button
          onClick={() => setActiveTab(tabBtn.value)}
          key={tabBtn.value}
          className={clsx(
            "bg-gray-500/5 shadow disabled:hidden py-2 px-6 text-sm mytransition hover:text-gray-100 rounded-full",
            activeTab === tabBtn.value
              ? "scale-105 text-gray-100 shadow-2xl cursor-default bg-gray-500/10"
              : "active:scale-90 hover:scale-102 hover:shadow-2xl text-gray-400 cursor-pointer",
          )}
        >
          {tabBtn.label}
        </button>
      ))}
    </div>
  );
}

export default TabsButtons;
