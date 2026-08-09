import { CommentType } from "@/types/Comment.type";
import { Dispatch, SetStateAction } from "react";
// ===============================================================
export type RepliesStateProviderType = {
  currentReply: CommentType | null;
  setCurrentReply: Dispatch<SetStateAction<CommentType | null>>;
  showReplyComposer: string;
  setShowReplyComposer: Dispatch<SetStateAction<string>>;
};
