import MediaFieldType from "@/app/(feeds)/messages/[userId]/_types/MediaFileld.type";
import Image from "next/image";
// ===============================
function ImageMedia({ field }: { field: MediaFieldType }) {
  return (
    <>
      {field.type === "IMAGE" && (
        <Image src={field.url} alt="" fill className="object-cover" />
      )}
    </>
  );
}

export default ImageMedia;
