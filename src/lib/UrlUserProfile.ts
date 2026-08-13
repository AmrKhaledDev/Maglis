import { useUser } from "@/providers/UserProvider";
// =====================================================
export const UrlUserProfile = (id: string) => {
  const user = useUser();
  return user.id === id ? "/u/profile" : `/u/${id}`;
};
