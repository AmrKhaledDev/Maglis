import GetSession from "@/auth/GetSession";
import UserProfile from "@/components/UserProfile/UserProfile";
import { redirect } from "next/navigation";
// =====================================================================
async function Profile() {
  const userSession = await GetSession();
  if (!userSession) return redirect("/login");
  return (
    <main>
      <UserProfile userId={userSession.id} />
    </main>
  );
}

export default Profile;
