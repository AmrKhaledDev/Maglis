import { useUser } from "@/providers/UserProvider";
// =================================================
function useIsBlocked(userId: string) {
  const userSession = useUser();
  return userSession.blocks.some((blocked) => blocked.blockedId === userId);
}

export default useIsBlocked;
