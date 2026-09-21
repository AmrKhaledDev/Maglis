import z from "zod";
import UploadMediaPropsType from "./UploadMediaProps.type";
import { UseFieldArrayRemove, UseFormSetValue } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
// ==========================================================================
type MediaListProps = UploadMediaPropsType & {
  remove: UseFieldArrayRemove;
  setCurrentMedia: Dispatch<
    SetStateAction<{ id: string; mediaType: string; mediaUrl: string }>
  >;
  currentMedia: { id: string; mediaType: string; mediaUrl: string };
};

export default MediaListProps;
