import { useFieldArray, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { CircleAlert, Globe, X } from "lucide-react";
import { CreatePost_ModalFormType } from "../../_types/CreatePost_ModalForm.type";
import axios from "axios";
import { CreatePostAction } from "@/actions/Post/CreatePost.action";
import { Privacy } from "@prisma/client";
import TogglePinButton from "./TogglePinButton";
import CommentsDisabled from "./CommentsDisabled";
import CreatePostModalAuthor from "./CreatePostModalAuthor";
import CreatePostModalCenter from "./CreatePostModalCenter";
import CreatePostModalMedia from "./CreatePostModalMedia";
import CreatePostModalFooter from "./CreatePostModalFooter";
// ===========================================================
function CreatePostModal({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { control, register, handleSubmit, watch, setValue } =
    useForm<CreatePost_ModalFormType>({
      defaultValues: {
        privacy: {
          label: "عام",
          value: "PUBLIC",
          icon: Globe,
        },
        commentsDisabled: false,
        isPinnedToProfile: false,
        content: "",
      },
    });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "media",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const content = watch("content", "");
  const handleCreatePost = async (data: CreatePost_ModalFormType) => {
    try {
      setLoading(true);
      setError("");
      if (!data.content.trim() && data.media.length < 1)
        return setError("لا يمكنك إرسال منشور فارغ.");
      let media: { url: string; type: "IMAGE" | "VIDEO" }[] = [];
      if (data.media.length > 0) {
        try {
          for (const field of data.media) {
            const formData = new FormData();
            formData.append("file", field.file);
            formData.append("pathname", "maglis-media");
            const { data: uploadResult } = await axios.post(
              `/api/upload-media`,
              formData,
            );
            media.push(uploadResult);
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            setError(
              error.response?.data.error ?? "حدث خطأ أثناء رفع الملفات.",
            );
            return;
          }
          console.error(error);
          setError("حدث خطأ أثناء إنشاء منشورك.");
        }
      }
      const result = await CreatePostAction(
        data.privacy.value as Privacy,
        data.commentsDisabled,
        data.isPinnedToProfile,
        data.content,
        media,
      );
      if (!result.success)
        return setError(
          result.message || "حدث خطأ غير متوقع أثناء إنشاء منشورك.",
        );
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      setError("حدث خطأ أثناء إنشاء منشورك حاول مرة أخرى");
    } finally {
      setLoading(false);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/50 backdrop-blur z-40 flex items-center justify-center text-slate-800"
    >
      <form
        onSubmit={handleSubmit(handleCreatePost)}
        className="bg-slate-800 ring ring-gray-50/5 text-white shadow-2xl p-3 rounded-xl w-200 max-h-170 overflow-y-auto"
      >
        <div className="flex items-center justify-between">
          <div className="mb-5 flex items-center gap-2">
            <TogglePinButton
              disabled={loading}
              control={control}
              setValue={setValue}
            />
            <CommentsDisabled
              control={control}
              setValue={setValue}
              disabled={loading}
            />
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="cursor-pointer text-gray-300 hover:text-white mytransition"
          >
            <X className="size-5" />
          </button>
        </div>
        {error && (
          <p className="text-sm text-red-500 mb-2 bg-red-100 p-1 font-semibold flex items-center gap-2">
            <CircleAlert className="size-4" />
            {error}
          </p>
        )}
        <CreatePostModalAuthor />
        <span className="w-full bg-white opacity-2 h-px rounded-full block mt-2 mb-5" />
        <CreatePostModalCenter
          control={control}
          setValue={setValue}
          register={register}
          disabled={loading}
        />
        <CreatePostModalMedia
          disabled={loading}
          media={fields}
          remove={remove}
        />
        <CreatePostModalFooter
          content={content}
          fields={fields}
          append={append}
          loading={loading}
        />
        <p className="mt-8 text-xs font-normal text-yellow-500">
          يرجى الالتزام بآداب الحوار واحترام الآخرين. يُمنع نشر أي محتوى يتضمن
          سبًا أو قذفًا أو إساءة أو تقليلًا من الآخرين. في حال مخالفة هذه
          السياسة، قد يتم حذف المنشور، وقد يؤدي تكرار المخالفات أو شدتها إلى
          إيقاف الحساب بشكل دائم.
        </p>
      </form>
    </motion.div>
  );
}

export default CreatePostModal;
