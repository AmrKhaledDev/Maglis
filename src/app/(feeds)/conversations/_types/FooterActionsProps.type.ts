import { RefObject } from "react";
import { UseFieldArrayRemove } from "react-hook-form";
import UploadMediaPropsType from "./UploadMediaProps.type";
// ============================================================================
type FooterActionPropsType = UploadMediaPropsType & {
  remove: UseFieldArrayRemove;
  messageInputRef: RefObject<HTMLInputElement | null>;
  isPending: boolean;
};
export default FooterActionPropsType;
