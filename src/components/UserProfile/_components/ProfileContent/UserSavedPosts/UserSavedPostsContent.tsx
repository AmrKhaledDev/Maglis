import Linkify from "linkify-react";
import UserSavedPostsMedia from "./UserSavedPostsMedia";
import { SavePostType } from "@/types/SavePost.type";
// ===============================================================
function UserSavedPostsContent({ saveItem }: { saveItem: SavePostType }) {
  return (
    <div className="flex flex-col mt-4 gap-2">
      <Linkify
        options={{
          target: "_blank",
          rel: "noopener noreferrer",
          attributes: {
            className: "text-sky-500 hover:underline ",
          },
        }}
      >
        <p
          dir="auto"
          className="whitespace-pre-line text-xs [word-break:break-word] line-clamp-1"
        >
          {saveItem.post.content}
        </p>
      </Linkify>
      <UserSavedPostsMedia saveItem={saveItem} />
    </div>
  );
}

export default UserSavedPostsContent;
