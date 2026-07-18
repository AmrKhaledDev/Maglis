import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
// =======================================================
function CommentImageUploadedPreview({
  imagePreview,
  imageFile,
  setImagePreview,
  setImageFile,
}: {
  imagePreview: string;
  imageFile: File | null;
  setImagePreview: Dispatch<SetStateAction<string>>;
  setImageFile: Dispatch<SetStateAction<File | null>>;
}) {
  return (
    <>
      {imagePreview && imageFile && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-2"
        >
          <div className="size-35 relative m-2 rounded overflow-hidden">
            <Image
              src={imagePreview}
              alt="صورة"
              fill
              className="object-cover"
            />
          </div>
          <button
            onClick={() => {
              setImagePreview("");
              setImageFile(null);
              URL.revokeObjectURL(imagePreview);
            }}
            className="cursor-pointer text-gray-400 hover:text-white mytransition"
          >
            <X strokeWidth={1.5} className="size-4" />
          </button>
        </motion.div>
      )}
    </>
  );
}

export default CommentImageUploadedPreview;
