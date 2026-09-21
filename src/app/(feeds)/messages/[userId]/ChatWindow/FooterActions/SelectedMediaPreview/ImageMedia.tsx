import Image from "next/image";
import MediaFieldType from "../../../_types/MediaFileld.type";
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
