import { GetFriendsAction } from "@/actions/User/GetFriends.action";
import { useUser } from "@/providers/UserProvider";
import { useQuery } from "@tanstack/react-query";
// =================================================
function Friends({ userId }: { userId: string }) {
  const userSession = useUser();
  const {
    data: friends = [],
    isPending,
    error,
  } = useQuery({
    queryFn: async () => {
      const result = await GetFriendsAction(userId);
      if (!result.success) throw new Error(result.message);
      return result.friends;
    },
    queryKey: ["friends", userSession, userId],
  });
  return (
    <div>
      {friends.map((friend) => (
        <div key={friend.friend.id}>{friend.friend.name}</div>
      ))}
    </div>
  );
}

export default Friends;
