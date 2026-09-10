import { MediaType } from "@prisma/client";
// ====================================
type MessageMediaType = {
  mediaType: "IMAGE" | "VIDEO" | "PDF";
  mediaUrl: string;
};
export default MessageMediaType;
