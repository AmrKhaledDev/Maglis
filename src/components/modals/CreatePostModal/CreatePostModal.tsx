import { CreateAction } from "@/actions/Post/Create.action";
import { EditAction } from "@/actions/Post/Edit.action";
import privacyMap from "@/data/privacyMap";
import { invalidateUserCaches } from "@/lib/invalidateUserCaches";
import { useActiveModal } from "@/providers/ActiveModalProvider";
import { useUser } from "@/providers/UserProvider";
import { PostType } from "@/types/Post.type";
import { Privacy } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { FormType } from "./_types/Form.type";
import Form from "./Form";
import FieldType from "./_types/Field.type";
// ==========================================================================
function CreatePostModal({ currentPost }: { currentPost?: PostType }) {
  const userSession = useUser();
  const defaultPrivacy = privacyMap[currentPost?.privacy ?? "FRIENDS"];
  const { setActiveModal } = useActiveModal();
  const currentMedia: FieldType[] = currentPost
    ? currentPost.medias.map((media) => ({
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
      if (data.media.length > 0) {
        try {
          for (const field of data.media) {
            if (!field.file) continue;
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
      const action = currentPost ? EditAction : CreateAction;
      const result = await action(
        data.privacy.value as Privacy,
        data.commentsDisabled,
        data.isPinnedToProfile,
        data.content,
        media,
        currentPost ? currentPost.id : "",
      );
      if (!result.success)
        throw new Error(
          result.message || "حدث خطأ غير متوقع أثناء إنشاء منشورك.",
        );
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
