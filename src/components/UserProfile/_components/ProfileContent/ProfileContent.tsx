"use client";
import { useState } from "react";
import { ActiveTab } from "../../_types/ActiveTab.type";
import TabsButtons from "./TabsButtons";
import UserFriends from "./UserConnections/UserConnections";
import UserImages from "./UserImages";
import UserPosts from "./UserPosts";
import UserStories from "./UserStories/UserStories";
import UserVideos from "./UserVideos";
// ======================================================================
function ProfileContent({ userId }: { userId: string }) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("USER_POSTS");
  return (
    <div className="w-full flex justify-between gap-2">
      {activeTab === "USER_POSTS" && <UserPosts userId={userId} />}
      {activeTab === "USER_STORIES" && <UserStories userId={userId} />}
      {activeTab === "USER_PHOTOS" && <UserImages userId={userId} />}
      {activeTab === "USER_VIDEOS" && <UserVideos userId={userId} />}
      {activeTab === "USER_FRIENDS" && <UserFriends userId={userId} />}
      <span />
      <TabsButtons setActiveTab={setActiveTab} activeTab={activeTab} />
    </div>
  );
}

export default ProfileContent;
