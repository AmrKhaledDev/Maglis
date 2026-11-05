import privacyMap from "@/data/privacyMap";
import { invalidateUserCaches } from "@/lib/invalidateUserCaches";
import { useActiveModal } from "@/providers/ActiveModalProvider";
import { useUser } from "@/providers/UserProvider";
import { Post } from "@/types/post.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { CreatePostBody } from "./_types/CreatePostBody.type";
import { Field } from "./_types/Field.type";
import { Form as FormType } from "./_types/Form.type";
import Form from "./Form";
// ==========================================================================
function CreatePostModal({ currentPost }: { currentPost?: Post }) {
  const userSession = useUser();
  const defaultPrivacy = privacyMap[currentPost?.privacy || "FRIENDS"];
  const { setActiveModal } = useActiveModal();
  const currentMedia: Field[] = currentPost
    ? currentPost.media.map((media) => ({
        file: null,
        type: media.type.toLowerCase() as "video" | "image" | "pdf" | null,
        preview: media.url,
      }))
    : [];
  const methods = useForm<FormType>({
    defaultValues: {
      privacy: {
        label: defaultPrivacy.label,
        value: defaultPrivacy.value,
        icon: defaultPrivacy.icon,
      },
      commentsDisabled: currentPost?.commentsDisabled ?? false,
      isPinnedToProfile: currentPost?.isPinnedToProfile ?? false,
      media: currentMedia,
      content: currentPost?.content ?? "",
    },
  });
  const { control } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "media",
  });
  const queryClient = useQueryClient();
  const {
    mutate,
    isPending: loading,
    error,
  } = useMutation({
    mutationFn: async (data: FormType) => {
      if (!data.content.trim() && data.media.length < 1)
        throw new Error("لا يمكنك إرسال منشور فارغ.");
      const media: { url: string; type: "IMAGE" | "VIDEO" }[] = data.media
        .filter((field) => !field.file && field.preview)
        .map((field) => ({
          url: field.preview,
          type: field.type!.toUpperCase() as "IMAGE" | "VIDEO",
        }));
      try {
        if (data.media.length > 0) {
          for (const field of data.media) {
            if (!field.file) continue;
            const formData = new FormData();
            formData.append("file", field.file);
            const { data } = await axios.post(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/cloudinary/upload`,
              formData,
            );
            media.push(data);
          }
        }
        const path = currentPost
          ? `posts/edit/${currentPost.id}`
          : "posts/create";
        const method = currentPost ? "patch" : "post";
        const body: CreatePostBody = {
          content: data.content,
          media,
          privacy: data.privacy.value as "FRIENDS" | "PUBLIC" | "PRIVATE",
          commentsDisabled: data.commentsDisabled,
          isPinnedToProfile: data.isPinnedToProfile,
        };
        const { data: axiosData } = await axios[method](
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/${path}`,
          body,
          { withCredentials: true },
        );
        const { success, message } = axiosData;
        if (!success)
          throw new Error(
            typeof message === "string"
              ? message
              : "حدث خطأ غير متوقع أثناء إنشاء منشورك.",
          );
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            error.response?.data.message ??
              error.response?.data.error ??
              "حدث خطأ أثناء رفع الملفات.",
          );
        }
        console.error(error);
        throw new Error("حدث خطأ أثناء إنشاء منشورك.");
      }
    },
    onSuccess: () => {
      invalidateUserCaches(queryClient, userSession);
      setActiveModal(null);
    },
  });
  return createPortal(
    <FormProvider {...methods}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/50 backdrop-blur z-40 flex items-center justify-center text-slate-800 menuKeepOpen"
      >
        <Form
          mutate={mutate}
          loading={loading}
          error={error}
          fields={fields}
          append={append}
          remove={remove}
        />
      </motion.div>
    </FormProvider>,
    document.body,
  );
}

export default CreatePostModal;
