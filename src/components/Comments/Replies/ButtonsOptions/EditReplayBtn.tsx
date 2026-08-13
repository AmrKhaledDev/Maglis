import { useRepliesState } from "@/providers/RepliesStateProvider";
import { useUser } from "@/providers/UserProvider";
import { CommentType } from "@/types/Comment.type";
import { Pencil } from "lucide-react";
// =================================================================
function EditReplayBtn({ reply }: { reply: CommentType }) {
  const { setShowReplyComposer, setCurrentReply } = useRepliesState();
  const userSession = useUser();
  return (
    <>
      {userSession.id === reply.userId && (
        <button
          onClick={() => {
            setShowReplyComposer(reply.id);
            setCurrentReply(reply);
          }}
          className="commentBtnAct"
        >
          <Pencil className="size-4" /> تعديل
        </button>
      )}
    </>
  );
}

export default EditReplayBtn;
