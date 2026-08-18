import { useFieldArray, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { CircleAlert, Globe, Images, X } from "lucide-react";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useActiveModal } from "@/providers/ActiveModalProvider";
// ===========================================================
function CreatePostModal() {
  const { setActiveModal } = useActiveModal();
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
  const content = watch("content", "");
  const queryClient = useQueryClient();
  const {
    mutate,
    isPending: loading,
    error,
  } = useMutation({
    mutationFn: async (data: CreatePost_ModalFormType) => {
      if (!data.content.trim() && data.media.length < 1)
        throw new Error("لا يمكنك إرسال منشور فارغ.");
      let media: { url: string; type: "IMAGE" | "VIDEO" }[] = [];
      if (data.media.length > 0) {
        try {
          for (const field of data.media) {
            const formData = new FormData();
            formData.append("file", field.file);
            const { data: uploadResult } = await axios.post(
              `/api/upload-media`,
              formData,
            );
            media.push(uploadResult);
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            throw new Error(
              error.response?.data.error ?? "حدث خطأ أثناء رفع الملفات.",
            );
          }
          console.error(error);
          throw new Error("حدث خطأ أثناء إنشاء منشورك.");
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
        throw new Error(
          result.message || "حدث خطأ غير متوقع أثناء إنشاء منشورك.",
        );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user_posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user_postsPhotos"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user_postsVideos"],
      });
      setActiveModal(null);
    },
  });
  const handleCreatePost = (data: CreatePost_ModalFormType) => {
    mutate(data);
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
        <div className="flex justify-between">
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
            onClick={() => setActiveModal(null)}
            className="cursor-pointer text-gray-300 h-fit hover:text-white mytransition"
          >
            <X className="size-5" />
          </button>
        </div>
        {error && (
          <p className="text-sm text-red-500 mb-2 bg-red-100 p-1 font-semibold flex items-center gap-2">
            <CircleAlert className="size-4" />
            {error.message}
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
        {fields.length > 0 && (
          <div className="text-gray-300 mt-4 flex flex-col items-center w-fit gap-0.5">
            <Images className="size-4" strokeWidth={2} />
            <p className="font-normal text-xs">{fields.length} / 4</p>
          </div>
        )}
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