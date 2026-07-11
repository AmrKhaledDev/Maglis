import { Dispatch, SetStateAction } from "react";
// ==============================================
export type MediaPreviewPropsType = {
  media: string;
  mediaFile: File | null;
  setMedia: Dispatch<SetStateAction<string>>;
  setMediaFile: Dispatch<SetStateAction<File | null>>;
}