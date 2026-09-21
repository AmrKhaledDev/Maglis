import { useUser } from "@/providers/UserProvider";
import Image from "next/image";
// ================================================
function CreatePostModalAuthor() {
  const userSession = useUser();
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <Image
          src={userSession.image || "/user.jpg"}
          alt="صورتك"
          height={50}
          width={50}
          className="rounded-full size-8 object-cover shrink-0"
        />
        <div>
          <h2 className="font-semibold">{userSession.name}</h2>
          <p className="text-xs text-gray-200">منشور جديد</p>
        </div>
      </div>
    </div>
  );
}

export default CreatePostModalAuthor;
