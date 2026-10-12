import ActiveTabUserFriends from "@/components/UserProfile/_types/ActiveTabUserFriends.type";
import { useState } from "react";
import Tabs from "./Tabs";
import Friends from "./Friends";
// ==================================================
function UserFriends({ userId }: { userId: string }) {
  const [activeTab, setActiveTab] = useState<ActiveTabUserFriends>("FRIENDS");
  return (
    <div className="flex-1 bg-white/1 h-100 rounded-2xl p-5">
      <div className="flex flex-col gap-7">
        <h1 className="text-xl font-semibold text-gray-200">الأصدقاء</h1>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "FRIENDS" && <Friends userId={userId} />}
      </div>
    </div>
  );
}

export default UserFriends;
