import { ActiveTab } from "@/components/UserProfile/_types/ActiveTab.type";
// ==========================================================================
type TabButton = {
  label: string;
  value: ActiveTab;
  active: boolean;
};
export const tabsButtons = (activeTab: ActiveTab): TabButton[] => {
  return [
    {
      label: "المنشورات",
      value: "USER_POSTS",
      active: activeTab == "USER_POSTS",
    },
    {
      label: "المحفوظات",
      value: "USER_SAVED_POSTS",
      active: activeTab == "USER_POSTS",
    },
    {
      label: "القصص",
      value: "USER_STORIES",
      active: activeTab == "USER_STORIES",
    },
    {
      label: "الصور",
      value: "USER_PHOTOS",
      active: activeTab == "USER_PHOTOS",
    },
    {
      label: "الفيديوهات",
      value: "USER_VIDEOS",
      active: activeTab == "USER_VIDEOS",
    },
  ];
};
