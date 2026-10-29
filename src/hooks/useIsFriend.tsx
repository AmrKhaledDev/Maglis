import { useUser } from "@/providers/UserProvider";
// ====================================================
function useIsFriend(userId: string) {
  const userSession = useUser();
  return userSession.friendships.some(
    (friendship) => friendship.friendId == userId,
  );
}

export default useIsFriend;
