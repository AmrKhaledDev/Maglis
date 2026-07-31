import { useUser } from "@/providers/UserProvider";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import AlertMessage from "@/components/AlertMessage/AlertMessage";
import clsx from "clsx";
import { UpdateUserImageAction } from "@/actions/User/UpdateUserImage.action";
import EditImageModalHeader from "./ProfileAvatar/EditImageModalHeader";
import ReplaceImageBtn from "./ProfileAvatar/ReplaceImageBtn";
import DeleteImageBtn from "./ProfileAvatar/DeleteAvatarBtn";
// ==============================================================
function EditProfileImageModal({
  setShowEditProfileImageModal,
  typeImage,
  image,
}: {
  setShowEditProfileImageModal: Dispatch<SetStateAction<boolean>>;
  typeImage: "AVATAR" | "COVER";
  image: string | null;
}) {
  if (!typeImage) return null;
  const user = useUser();
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const handleUpdateImage = async () => {
    setLoading(true);
    setError("");
    if (!imageFile || !imagePreview) return setError("برجاء رفع صورة أولاً.");
    const formData = new FormData();
    formData.append("file", imageFile);
    try {
      const res = await axios.post("/api/upload-media", formData);
      const newAvatar: { url: string } = res.data;
      const result = await UpdateUserImageAction(
        newAvatar.url,
        typeImage,
        user.id,
      );
      if (!result.success) return setError(result.message);
      setImageFile(null);
      setImagePreview("");
      setShowEditProfileImageModal(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data.error ||
            "حدث خطأ أثناء رفع صورة الملف الشخصي الخاص بك تأكد من الإتصال بالإنترنت.",
        );
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/40 flex items-center justify-center backdrop-blur z-60"
    >
      <div
        className={clsx(
          "bg-slate-800 flex modalEditAvatar flex-col rounded-xl shadow",
          {
            "w-200": typeImage === "AVATAR",
            "w-270": typeImage === "COVER",
          },
        )}
      >
        <EditImageModalHeader
          typeImage={typeImage}
          setShowEditAvatarModal={setShowEditProfileImageModal}
        />
        <div
          className={clsx(
            "w-full h-full flex items-center justify-center bg-gray-700",
            {
              "p-5": typeImage == "AVATAR",
              "p-2": typeImage == "COVER",
            },
          )}
        >
          <div
            className={clsx("relative shrink-0 ", {
              "size-60": typeImage == "AVATAR",
              "w-full h-90": typeImage == "COVER",
            })}
          >
            {typeImage === "AVATAR" && (
              <Image
                src={imagePreview || image || "/user.jpg"}
                alt="الصورة الشخصية"
                fill
                className="object-cover rounded-full"
              />
            )}
            {typeImage === "COVER" && (
              <Image
                src={imagePreview || image || "/cover_default.jpg"}
                alt="صورة الغلاف"
                fill
                className=""
              />
            )}
          </div>
        </div>
        {error && <AlertMessage message={error} type="error" />}
        <div className="p-2 flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <ReplaceImageBtn
              setAvatarFile={setImageFile}
              setAvatarPreview={setImagePreview}
            />
            <button
              onClick={() => handleUpdateImage()}
              disabled={!imageFile || !imagePreview || loading}
              className="flex items-center disabled:text-gray-500 not-disabled:hover:bg-slate-600/20 mytransition p-3 text-[17px] text-gray-300 not-disabled:cursor-pointer flex-col"
            >
              <Save strokeWidth={1.5} /> حفظ
            </button>
          </div>
          <DeleteImageBtn
            setShowEditAvatarModal={setShowEditProfileImageModal}
            setError={setError}
            typeImage={typeImage}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default EditProfileImageModal;
