import MediaFieldType from "@/app/(feeds)/conversations/_types/MediaFileld.type";
import Image from "next/image";
// ===============================
function ImageMedia({ field }: { field: MediaFieldType }) {
  return (
    <>
      {field.type === "IMAGE" && (
        <Image src={field.url} alt="صورة" fill className="object-cover" />
      )}
    </>
  );
}

export default ImageMedia;
