type MessageMediaType = {
  url: string;
  type: "IMAGE" | "VIDEO" | "PDF";
  name: string;
  size: number;
};
export default MessageMediaType;
