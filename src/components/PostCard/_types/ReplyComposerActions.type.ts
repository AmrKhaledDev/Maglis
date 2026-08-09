import { CommentType } from "@/types/Comment.type";
import { Dispatch, SetStateAction } from "react";
// =====================================================
export type ReplyComposerActionsType = {
  currentReply: CommentType | null;
  setCurrentReply: Dispatch<SetStateAction<CommentType | null>>;
  handleCreateReply: () => void;
  content: string;
  imagePreview: string;
  loading: boolean;
  setImageFile: Dispatch<SetStateAction<File | null>>;
  setImagePreview: Dispatch<SetStateAction<string>>;
};
