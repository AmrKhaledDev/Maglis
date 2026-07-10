export type PostModalFormType = {
  media: {
    preview: string;
    file: File;
    type: "video" | "image";
  }[];
  content: string;
};
