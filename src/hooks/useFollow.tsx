import { useQuery } from "@tanstack/react-query";
import { useUser } from "@/providers/UserProvider";
// =======================================================
export function useFollow(followingId: string) {
  const userSession = useUser();
  const isFollowing = userSession.followings.some(
    (user) => user.followingId === followingId,
  );
  return useQuery({
    queryKey: ["follow", followingId],
    queryFn: async () => isFollowing,
    initialData: isFollowing,
  });
}
