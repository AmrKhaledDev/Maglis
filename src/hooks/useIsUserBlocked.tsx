import { useUser } from "@/providers/UserProvider";
// =================================================
function useIsUserBlocked(userId: string) {
  const userSession = useUser();
  return userSession.blocks.some((blocked) => blocked.blockedId === userId);
}

export default useIsUserBlocked;
