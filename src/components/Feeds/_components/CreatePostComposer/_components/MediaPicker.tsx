import { motion } from "framer-motion";
import Image from "next/image";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
// ================================================================
function MediaPicker({
  setMedia,
  setMediaFile,
}: {
  setMedia: Dispatch<SetStateAction<string>>;
  setMediaFile: Dispatch<SetStateAction<File | null>>;
}) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setMedia(url);
      setMediaFile(file);
      e.target.value = "";
    }
  };
  const uploadOptions = [
    { icon: "/image.png", id: "image", accept: "image/*" },
    { icon: "/video.png", id: "video", accept: "video/*" },
  ];
  return (
    <div className="flex items-center gap-3">
      {uploadOptions.map((option) => (
        <div key={option.id}>
          <motion.label
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            htmlFor={option.id}
            className="text-3xl shadow block cursor-pointer rounded-full relative size-6.5"
          >
            <Image src={option.icon} alt="" className="object-contain" fill />
          </motion.label>
          <input
            onChange={handleChange}
            type="file"
            id={option.id}
            className="hidden"
            hidden
            accept={option.accept}
          />
        </div>
      ))}
    </div>
  );
}

export default MediaPicker;
