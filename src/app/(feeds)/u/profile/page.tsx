import ProfileCover from "./_components/ProfileCover";
import ProfileAvatar from "./_components/ProfileAvatar/ProfileAvatar";
import ProfileDetails from "./_components/ProfileDetails";
import ProfileSocialLinks from "./_components/ProfileSocialLinks";
import ProfileAbout from "./_components/ProfileAbout/ProfileAbout";
import GetSession from "@/auth/GetSession";
import { redirect } from "next/navigation";
import ProfileContent from "./_components/ProfileContent/ProfileContent";
// =====================================================================
async function Profile() {
  const user = await GetSession();
  if (!user) return redirect("/login");
  return (
    <div className="pt-5 min-h-screen">
      <div className="max-w-270 mx-auto flex flex-col gap-20 pb-12">
        <div className="flex flex-col gap-5">
          <div className="w-full bg-white/4 overflow-hidden rounded-2xl">
            <ProfileCover />
            <div className="flex p-2 gap-15">
              <div className="flex gap-4">
                <ProfileAvatar />
                <ProfileDetails />
              </div>
              <ProfileAbout />
            </div>
          </div>
          <ProfileSocialLinks />
        </div>
        <ProfileContent />
      </div>
    </div>
  );
}

export default Profile;
