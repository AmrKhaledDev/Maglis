import { Comment } from "@/types/Comment.type";
import { Dispatch, SetStateAction } from "react";
// =====================================================
export type ReplyComposerActionsType = {
  currentReply: Comment | null;
  setCurrentReply: Dispatch<SetStateAction<Comment | null>>;
  handleCreateReply: () => void;
  content: string;
  imagePreview: string;
  loading: boolean;
  setImageFile: Dispatch<SetStateAction<File | null>>;
  setImagePreview: Dispatch<SetStateAction<string>>;
};
