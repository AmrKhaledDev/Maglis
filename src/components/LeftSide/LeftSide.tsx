"use client";
import { usePathname } from "next/navigation";
import RecentContacts from "./RecentContacts/RecentContacts";
import SuggestedUsers from "./SuggestedUsers/SuggestedUsers";
// ================================================================
function LeftSide() {
  const pathname = usePathname();
  if (pathname.startsWith("/conversations")) return null;
  return (
    <aside className="w-74 flex flex-col gap-10 sticky! top-26 mytransition">
      <SuggestedUsers />
      {/* <SuggestedGroups /> */}
      <RecentContacts />
    </aside>
  );
}

export default LeftSide;
