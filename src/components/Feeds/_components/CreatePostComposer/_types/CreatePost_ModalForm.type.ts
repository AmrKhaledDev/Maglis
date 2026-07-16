import { PrivacyType } from "../../../../../types/Privacy.type";
// =========================================================================
export type CreatePost_ModalFormType = {
  media: {
    preview: string;
    file: File;
    type: "video" | "image";
  }[];
  content: string;
  privacy: PrivacyType;
  commentsDisabled: boolean;
  isPinnedToProfile: boolean;
};
