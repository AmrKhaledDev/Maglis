"use client";
import { GetSuggestedPeopleAction } from "@/actions/User/GetSuggestedPeople.action";
import FollowButton from "@/components/FollowButton/FollowButton";
import { useUser } from "@/providers/UserProvider";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import SuggestedPeopleHeader from "./Header";
import SuggestedPeopleSkeleton from "./Skeleton";
import UserDetails from "./UserDetails";
// ==================================
function SuggestedPeople() {
  const pathname = usePathname();
  if (pathname === "/videos") return null;
  const userSession = useUser();
  const { data = [], isPending } = useQuery({
    queryFn: async () => {
      const result = await GetSuggestedPeopleAction();
      if (!result.success && result.message) throw new Error(result.message);
      return result.suggestedPeople;
    },
    queryKey: ["suggestedPeople", userSession.id],
  });
  return (
    <div className=" p-4 shadow rounded-2xl overflow-hidden flex flex-col gap-5">
      <SuggestedPeopleHeader dataLenght={data.length} isPending={isPending} />
      <div className="flex flex-col gap-2">
        {isPending ? (
          <SuggestedPeopleSkeleton />
        ) : (
          data.length > 0 &&
          data.map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <UserDetails user={user} />
              <FollowButton
                followingId={user.id}
                followColor="hover:bg-white/10"
                unfollowColor="text-red-500!"
                textColor="text-[11px] py-2 px-4 bg-white/5 rounded-full shadow cursor-pointer font-medium flex items-center gap-1.5"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SuggestedPeople;
