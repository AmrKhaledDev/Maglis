import { useUser } from "@/providers/UserProvider";
// =====================================================
export const UrlUserProfile = (id: string) => {
  const userSession = useUser();
  return userSession.id === id ? "/u/profile" : `/u/${id}`;
};
