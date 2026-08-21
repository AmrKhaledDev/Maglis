import ProfileAbout from "@/components/UserProfile/_components/ProfileAbout/ProfileAbout";
import ProfileAvatar from "@/components/UserProfile/_components/ProfileAvatar/ProfileAvatar";
import ProfileContent from "@/components/UserProfile/_components/ProfileContent/ProfileContent";
import ProfileCover from "@/components/UserProfile/_components/ProfileCover";
import ProfileDetails from "@/components/UserProfile/_components/ProfileDetails/ProfileDetails";
import ProfileSocialLinks from "@/components/UserProfile/_components/ProfileSocialLinks";
import { prisma } from "@/lib/prisma";
// ======================================================================================
async function UserProfile({ userId }: { userId: string }) {
  if (!userId) return null;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      socialLinks: true,
    },
  });
  if (!user) return null;
  return (
    <div className="pt-5 min-h-screen">
      <div className="max-w-220 mx-auto flex flex-col gap-15 pb-10">
        <div className="flex flex-col gap-5">
          <div className="w-full bg-white/5 overflow-hidden rounded-2xl">
            <ProfileCover user={user} />
            <div className="flex gap-20 p-2">
              <div className="flex gap-4">
                <ProfileAvatar user={user} />
                <ProfileDetails user={user} />
              </div>
              <ProfileAbout user={user} />
            </div>
          </div>
          <ProfileSocialLinks user={user} />
        </div>
        <ProfileContent userId={user.id} />
      </div>
    </div>
  );
}

export default UserProfile;
