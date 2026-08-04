import UserProfile from "@/components/UserProfile/UserProfile";
// ============================================================================
async function page({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  if (!userId) return null;
  return (
    <main>
      <UserProfile userId={userId} />
    </main>
  );
}

export default page;
