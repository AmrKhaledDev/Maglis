"use client";
import UserPosts from "./UserPosts";
import { useEffect, useState } from "react";
import { ActiveTab } from "../../_types/ActiveTab.type";
import TabsButtons from "./TabsButtons";
import UserImages from "./UserImages";
import UserVideos from "./UserVideos";
import UserSavedPosts from "./UserSavedPosts/UserSavedPosts";
import UserStories from "./UserStories/UserStories";
// =============================================
function ProfileContent({ userId }: { userId: string }) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("USER_POSTS");
  useEffect(() => {
    const saveTab = sessionStorage.getItem("ACTIVE_TAB");
    if (saveTab) {
      setActiveTab(saveTab as ActiveTab);
    }
  }, []);
  useEffect(() => {
    sessionStorage.setItem("ACTIVE_TAB", activeTab);
  }, [activeTab]);
  return (
    <div className="w-full flex justify-between gap-5">
      {activeTab === "USER_POSTS" && <UserPosts userId={userId} />}
      {activeTab === "USER_SAVED_POSTS" && <UserSavedPosts userId={userId} />}
      {activeTab === "USER_STORIES" && <UserStories userId={userId} />}
      {activeTab === "USER_PHOTOS" && <UserImages userId={userId} />}
      {activeTab === "USER_VIDEOS" && <UserVideos userId={userId} />}
      <span />
      <TabsButtons setActiveTab={setActiveTab} activeTab={activeTab} />
    </div>
  );
}

export default ProfileContent;
