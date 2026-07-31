import { Dispatch, SetStateAction } from "react";
import { ActiveTab } from "../../_types/ActiveTab.type";
import { tabsButtons } from "@/data/UserProfile/TabsButtonn";
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
          className={`bg-gray-500/10 py-2 px-6 text-xs mytransition hover:text-gray-100 text-shadow-2xs font-bold rounded-full ring ${activeTab === tabBtn.value ? "scale-110 text-gray-100 shadow-2xl cursor-default" : "active:scale-90 hover:scale-102 hover:shadow-2xl text-gray-500 cursor-pointer"}`}
        >
          {tabBtn.label}
        </button>
      ))}
    </div>
  );
}

export default TabsButtons;
