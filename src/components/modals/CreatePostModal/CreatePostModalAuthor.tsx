import UserImage from "@/components/UserImage/UserImage";
import { useUser } from "@/providers/UserProvider";
// ================================================
function CreatePostModalAuthor() {
  const userSession = useUser();
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <UserImage src={userSession.image} size="size-10" />
        <div>
          <h2>{userSession.name}</h2>
          <p className="text-xs text-gray-200">منشور جديد</p>
        </div>
      </div>
    </div>
  );
}

export default CreatePostModalAuthor;
