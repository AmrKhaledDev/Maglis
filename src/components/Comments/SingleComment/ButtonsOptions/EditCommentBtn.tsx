import { useActiveMenu } from "@/providers/ActiveMenuProvider";
import { useUser } from "@/providers/UserProvider";
import { Comment } from "@prisma/client";
import { Pencil } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
// ====================================================
function EditCommentBtn({
  setCurrentComment,
  comment,
}: {
  setCurrentComment: Dispatch<SetStateAction<Comment | null>>;
  comment: Comment;
}) {
  const { setActiveMenu } = useActiveMenu();
  const userSession = useUser();
  return (
    <>
      {userSession.id === comment.userId && (
        <button
          onClick={() => {
            setActiveMenu("");
            setCurrentComment(comment);
          }}
          className="flex items-center gap-2 text-xs hover:bg-white mytransition cursor-pointer"
        >
          <Pencil className="size-4" /> تعديل
        </button>
      )}
    </>
  );
}

export default EditCommentBtn;
