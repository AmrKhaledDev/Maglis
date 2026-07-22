import { PostDBType } from "@/types/PostDB.type";
import { Dispatch, SetStateAction, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { EditPostModalFormType } from "../../_types/EditPostModalForm.type";
import { PrivacyType } from "@/types/Privacy.type";
import { privacyOptions } from "@/data/SelectPrivacy/PrivacyOptions";
import { CircleAlert, Globe } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { MediaType, Privacy } from "@prisma/client";
import { EditPostAction } from "@/actions/Post/EditPost.action";
import EditPostBtnModalMedia from "./EditPostBtnModalMedia";
import EditPostBtnModalFooter from "./EditPostBtnModalFooter";
import EditPostBtnModalContent from "./EditPostBtnModalContent";
import EditPostBtnModalHeader from "./EditPostBtnModalHeader";
import EditPostBtnModalAuthor from "./EditPostBtnModalAuthor";
// ==========================================================================================================
function EditPostBtnModal({
  post,
  setModal,
}: {
  post: PostDBType;
  setModal: Dispatch<SetStateAction<boolean>>;
}) {
  const postPrivacy: PrivacyType = privacyOptions.find(
    (item) => item.value === post.privacy,
  ) ?? { icon: Globe, label: "عام", value: "PUBLIC" };
  const { register, handleSubmit, setValue, watch, control } =
    useForm<EditPostModalFormType>({
      defaultValues: {
        content: post.content ?? "",
        privacy: postPrivacy,
        commentsDisabled: post.commentsDisabled,
        isPinnedToProfile: post.isPinnedToProfile,
        media:
          post.medias.map((item) => ({
            preview: item.url,
            type: item.type,
            file: null,
          })) || [],
      },
    });
  const { append, remove, fields } = useFieldArray({
    control,
    name: "media",
  });
  const content = watch("content");
  const isPinnedToProfile = watch("isPinnedToProfile");
  const commentsDisabled = watch("commentsDisabled");
  const privacy = watch("privacy");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleEditPost = async (data: EditPostModalFormType) => {
    try {
      setLoading(true);
      setError("");
      if (!content.trim() && data.media.length === 0)
        return setError("لا يمكنك نشر منشور فارغ.");
      const media = data.media.filter((item) => !item.file);
      const files = data.media.filter((item) => item.file);
      if (files.length > 0) {
        for (const mediaItem of files) {
          try {
            if (!mediaItem.file) continue;
            const formData = new FormData();
            formData.append("file", mediaItem.file);
            formData.append("pathname", "maglis-media");
            const res = await axios.post("/api/upload-media", formData);
            const result: { url: string; type: MediaType } = res.data;
            media.push({
              preview: result.url,
              type: result.type,
              file: null,
            });
          } catch (error) {
            console.error(error);
            continue;
          }
        }
      }
      const result = await EditPostAction(
        post.id,
        data.privacy.value as Privacy,
        data.commentsDisabled,
        data.isPinnedToProfile,
        data.content,
        media.map((item) => ({ url: item.preview, type: item.type })),
      );
      if (!result.success)
        return setError(result.message ?? "حدث خطأ أثناء تعديل منشورك.");
      setModal(false);
    } catch (error) {
      console.error(error);
      setError("حدث خطأ أثناء تعديل المنشور حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur z-60">
      <motion.form
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.1 }}
        onSubmit={handleSubmit(handleEditPost)}
        className="w-200 p-3 max-h-150 overflow-y-auto ring ring-gray-50/10 bg-slate-800 rounded-2xl shadow-2xl text-white"
      >
        <EditPostBtnModalHeader
          setValue={setValue}
          setModal={setModal}
          commentsDisabled={commentsDisabled}
          loading={loading}
          isPinnedToProfile={isPinnedToProfile}
        />

        <hr className="border-white opacity-3 my-2" />
        {error && (
          <p className="text-sm text-red-500 mb-2 bg-red-100 p-1 font-semibold flex items-center gap-2">
            <CircleAlert className="size-4" />
            {error}
          </p>
        )}
        <EditPostBtnModalAuthor
          post={post}
          setValue={setValue}
          privacy={privacy}
          loading={loading}
        />
        <EditPostBtnModalContent content={content} register={register} />
        {fields && fields.length > 0 && (
          <EditPostBtnModalMedia loading={loading} fields={fields} remove={remove} />
        )}
        <EditPostBtnModalFooter
          fields={fields}
          append={append}
          loading={loading}
        />
      </motion.form>
    </div>
  );
}

export default EditPostBtnModal;
