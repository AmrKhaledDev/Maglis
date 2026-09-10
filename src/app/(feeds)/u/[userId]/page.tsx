import GetSession from "@/auth/GetSession";
import UserProfile from "@/components/UserProfile/UserProfile";
import { redirect } from "next/navigation";
// ============================================================================
async function page({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  if (!userId) return null;
  const userSession = await GetSession();
  if (!userSession) return redirect("/login");
  if (userSession.id === userId) return redirect("/u/profile");
  return (
    <main className="w-full">
      <UserProfile userId={userId} />
    </main>
  );
}

export default page;
