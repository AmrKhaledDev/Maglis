import { Comment } from "@/types/Comment.type";
import { Dispatch, SetStateAction } from "react";
// ===============================================================
export type RepliesStateProviderType = {
  currentReply: Comment | null;
  setCurrentReply: Dispatch<SetStateAction<Comment | null>>;
  showReplyComposer: string;
  setShowReplyComposer: Dispatch<SetStateAction<string>>;
};
