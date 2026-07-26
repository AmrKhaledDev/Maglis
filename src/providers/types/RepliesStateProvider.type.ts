import { CommentDbType } from "@/types/Comment.type";
import { Dispatch, SetStateAction } from "react";
// ===============================================================
export type RepliesStateProviderType = {
  currentReply: CommentDbType | null;
  setCurrentReply: Dispatch<SetStateAction<CommentDbType | null>>;
  //   ===========================================================
  showReplyComposer: string;
  setShowReplyComposer: Dispatch<SetStateAction<string>>;
};
