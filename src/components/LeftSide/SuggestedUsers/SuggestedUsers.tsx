"use client";
import { GetSuggestedUsersAction } from "@/actions/User/GetSuggestedUsers.action";
import FollowButton from "@/components/FollowButton/FollowButton";
import { useUser } from "@/providers/UserProvider";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import Skeleton from "../../Skeletons/LeftSide/Skeleton";
import SectionHeader from "../SectionHeader";
import UserDetails from "./UserDetails";
// =======================================================================================
function SuggestedUsers() {
  const pathname = usePathname();
  const userSession = useUser();
  const { data = [], isPending } = useQuery({
    queryFn: async () => {
      const result = await GetSuggestedUsersAction();
      if (!result.success && result.message) throw new Error(result.message);
      return result.suggestedUsers;
    },
    queryKey: ["suggestedUsers", userSession.id],
  });
  if (pathname === "/videos") return null;
  return (
    <div className="flex flex-col gap-5">
      <SectionHeader
        title="أشخاص مقترحون"
        linkUrl="/"
        isPending={isPending}
        dataLength={data.length}
      />
      <div className="flex flex-col gap-3">
        {isPending ? (
          <Skeleton />
        ) : (
          data.length > 0 &&
          data.map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <UserDetails user={user} />
              <FollowButton
                followingId={user.id}
                followStyle="hover:bg-white/10"
                unfollowStyle="text-red-500!"
                iconStyle="size-4"
                publicStyle="text-xs py-2 px-4 bg-white/5 rounded-full shadow cursor-pointer font-medium flex items-center gap-1.5"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SuggestedUsers;
