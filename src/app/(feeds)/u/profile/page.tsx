import GetSession from "@/auth/GetSession";
import UserProfile from "@/components/UserProfile/UserProfile";
import { redirect } from "next/navigation";
// =====================================================================
async function Profile() {
  const user = await GetSession();
  if (!user) return redirect("/login");
  return (
    <main>
      <UserProfile userId={user.id} />
    </main>
  );
}

export default Profile;
