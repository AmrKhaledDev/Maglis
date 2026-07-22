import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
// =======================================================
function CommentImageUploadedPreview({
  imagePreview,
  setImagePreview,
  setImageFile,
}: {
  imagePreview: string;
  setImagePreview: Dispatch<SetStateAction<string>>;
  setImageFile: Dispatch<SetStateAction<File | null>>;
}) {
  return (
    <>
      {imagePreview  && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="flex items-center"
        >
          <div className="size-30 relative rounded overflow-hidden gap-0.5">
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
