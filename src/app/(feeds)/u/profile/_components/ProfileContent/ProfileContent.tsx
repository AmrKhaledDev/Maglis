"use client";
import UserPosts from "./UserPosts";
import { useEffect, useState } from "react";
import { ActiveTab } from "../../_types/ActiveTab.type";
import TabsButtons from "./TabsButtons";
import UserImages from "./UserImages";
import UserVideos from "./UserVideos";
import UserSavedPosts from "./UserSavedPosts";
// =============================================
function ProfileContent() {
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
    <div className="w-full flex justify-between gap-10">
      {activeTab === "USER_POSTS" && <UserPosts />}
      {activeTab === "USER_SAVED_POSTS" && (
        <UserSavedPosts />
      )}
      {activeTab === "USER_PHOTOS" && <UserImages  />}
      {activeTab === "USER_VIDEOS" && <UserVideos  />}
      <span />
      <TabsButtons setActiveTab={setActiveTab} activeTab={activeTab} />
    </div>
  );
}

export default ProfileContent;
