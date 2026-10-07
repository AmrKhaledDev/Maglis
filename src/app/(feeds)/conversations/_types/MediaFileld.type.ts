type MediaFieldType = {
  type: "IMAGE" | "VIDEO" | "PDF";
  url: string;
  file?: File | null | undefined;
} & Record<"id", string>;
export default MediaFieldType;
