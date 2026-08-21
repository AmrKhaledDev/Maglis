import { useUser } from "@/providers/UserProvider";
import { User } from "@prisma/client";
import { MessageCircle, Plus, UserRoundPlus } from "lucide-react";
import Link from "next/link";
// ====================================================================
function ProfileDetailsFooter({ user }: { user: User }) {
  const userSession = useUser();
  return (
    <>
      {userSession.id !== user.id && (
        <div className="mt-3 flex items-center gap-2">
          <button className="flex text-xs items-center hover:outline hover:outline-blue-600 outline-offset-2 gap-2 cursor-pointer text-gray-200 font-semibold bg-blue-800 shadow py-1.5 px-3 rounded-full">
            {user.professionalMode ? (
              <>
                <Plus className="size-4" />
                متابعة
              </>
            ) : (
              <>
                <UserRoundPlus className="size-4" /> طلب صداقة
              </>
            )}
          </button>
          <Link
            href={`/messages/${user.id}`}
            className="flex text-xs items-center hover:outline hover:outline-green-950 outline-offset-2 gap-2 cursor-pointer text-gray-200 font-semibold bg-green-950 shadow py-1.5 px-3 rounded-full"
          >
            <MessageCircle className="size-4" />
            تواصل
          </Link>
        </div>
      )}
    </>
  );
}

export default ProfileDetailsFooter;
