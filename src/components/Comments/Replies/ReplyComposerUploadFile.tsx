import { ImageUp } from "lucide-react";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
// ============================================
function ReplyComposerUploadFile({
  setImagePreview,
  setImageFile,
}: {
  setImagePreview: Dispatch<SetStateAction<string>>;
  setImageFile: Dispatch<SetStateAction<File | null>>;
}) {
  const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
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
        htmlFor="upload_image_to_reply"
        className="text-gray-300 block cursor-pointer rounded-full hover:text-white mytransition"
      >
        <ImageUp strokeWidth={1.5} className="size-4" />
      </label>
      <input
        onChange={handleUploadFile}
        type="file"
        id="upload_image_to_reply"
        hidden
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}

export default ReplyComposerUploadFile;
