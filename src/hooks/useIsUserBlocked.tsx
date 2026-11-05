import { useUser } from "@/providers/UserProvider";
// =================================================
function useIsUserBlocked(userId: string) {
  const userSession = useUser();
  return userSession.blockedUsers.some(
    (blocked) => blocked.blockedId === userId,
  );
}

export default useIsUserBlocked;
