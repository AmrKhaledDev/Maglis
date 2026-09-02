import { useUser } from "@/providers/UserProvider";
import { useQuery } from "@tanstack/react-query";
// =================================================
function useAddFriend(receiverId: string) {
  const userSession = useUser();
  const isSent = userSession.sender.some(
    (friend) => friend.receiverId === receiverId,
  );
  return useQuery({
    queryFn: () => isSent,
    queryKey: ["friend", receiverId],
    initialData: isSent,
  });
}

export default useAddFriend;
