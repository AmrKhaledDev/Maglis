import { Edit, SendHorizontal, X } from "lucide-react";
import ReplyComposerUploadFile from "./ReplyComposerUploadFile";
import { ReplyComposerActionsType } from "../../PostCard/_types/ReplyComposerActions.type";
// ==========================================================
function ReplyComposerActions({
  currentReply,
  setCurrentReply,
  handleCreateReply,
  content,
  imagePreview,
  loading,
  setImageFile,
  setImagePreview,
}:ReplyComposerActionsType) {
  return (
    <div className="p-1.5 flex items-center gap-1 justify-end">
      {currentReply && (
        <button
          onClick={() => {
            setCurrentReply(null);
          }}
          className="cursor-pointer text-gray-400 hover:text-white mytransition"
        >
          <X className="size-4" />
        </button>
      )}
      <button
        onClick={() => handleCreateReply()}
        disabled={(!content.trim() && !imagePreview) || loading}
        className="p-1 rounded-full not-disabled:hover:bg-blue-800 w-fit mytransition disabled:bg-gray-400 disabled:text-gray-600 not-disabled:cursor-pointer bg-blue-600"
      >
        {currentReply ? (
          <Edit className="size-3" />
        ) : (
          <SendHorizontal className="size-3" />
        )}
      </button>
      <ReplyComposerUploadFile
        setImageFile={setImageFile}
        setImagePreview={setImagePreview}
      />
    </div>
  );
}

export default ReplyComposerActions;
