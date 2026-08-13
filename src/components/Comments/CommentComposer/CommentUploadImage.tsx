import { ImageUp } from "lucide-react";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
// ================================================
function CommentUploadImage({
  setImagePreview,
  setImageFile,
}: {
  setImagePreview: Dispatch<SetStateAction<string>>;
  setImageFile: Dispatch<SetStateAction<File | null>>;
}) {
  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setImageFile(file);
      e.target.value = "";
    }
  };
  return (
    <div>
      <label
        htmlFor="upload_image"
        className=" text-gray-300 block cursor-pointer rounded-full hover:text-white mytransition"
      >
        <ImageUp strokeWidth={1.5} className="size-5" />
      </label>
      <input
        onChange={handleUploadImage}
        id="upload_image"
        accept="image/*"
        type="file"
        hidden
        className="hidden"
      />
    </div>
  );
}

export default CommentUploadImage;
