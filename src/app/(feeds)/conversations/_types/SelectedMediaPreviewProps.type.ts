import { CreateMessageSchema } from "@/ZodSchemas/Message/CreateMessage.schema";
import { UseFieldArrayRemove } from "react-hook-form";
import z from "zod";
import UploadMediaPropsType from "./UploadMediaProps.type";
// =====================================================================
type SelectedMediaPreviewPropsType = UploadMediaPropsType & {
  remove: UseFieldArrayRemove;
  isPending: boolean;
};

export default SelectedMediaPreviewPropsType;
