import GetSession from "@/auth/GetSession";
import UserProfile from "@/components/UserProfile/UserProfile";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
// ============================================================================
async function page({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  if (!userId) return redirect("/");
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
    },
  });
  if (!user) return redirect("/");
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
