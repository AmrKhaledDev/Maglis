import { SOCIAL_PLATFORMS_MAP } from "@/data/UserProfile/SOCIAL_PLATFORMS_MAP";
import { UserWithSocialLinkType } from "../_types/UserWithSocialLink.type";
import clsx from "clsx";
import Link from "next/link";
// =====================================================================================
function ProfileSocialLinks({ user }: { user: UserWithSocialLinkType }) {
  return (
    <div
      className={clsx(
        "w-full flex flex-col",
        user.socialLinks.length < 1 && "gap-3",
        user.socialLinks.length > 0 && "gap-7",
      )}
    >
      <h2 className="font-bold text-xl text-gray-200">روابط التواصل</h2>
      <div className="grid grid-cols-5 gap-5 cursor-pointer">
        {user.socialLinks.length > 0 ? (
          user.socialLinks.map((platform) => {
            const PLATFORM = SOCIAL_PLATFORMS_MAP[platform.platform];
            return (
              <Link
              target="_blank"
                href={platform.link}
                key={platform.id}
                className="p-3 hover:bg-white/30 hover:scale-102 mytransition flex flex-col gap-2 items-center ring-1 ring-gray-50/15 bg-white/10 rounded-2xl shadow"
              >
                <PLATFORM.icon className="text-2xl" />
                <p className="font-bold text-shadow-2xs">{PLATFORM.label}</p>
              </Link>
            );
          })
        ) : (
          <p className="font-semibold text-sm text-gray-400">
            لا يوجد روابط تواصل حالياً.
          </p>
        )}
      </div>
    </div>
  );
}

export default ProfileSocialLinks;
