import { CommentDbType } from "@/types/Comment.type";
import { Dispatch, SetStateAction } from "react";
// =====================================================
export type ReplyComposerActionsType = {
  currentReply: CommentDbType | null;
  setCurrentReply: Dispatch<SetStateAction<CommentDbType | null>>;
  handleCreateReply: () => void;
  content: string;
  imagePreview: string;
  loading: boolean;
  setImageFile: Dispatch<SetStateAction<File | null>>;
  setImagePreview: Dispatch<SetStateAction<string>>;
};
