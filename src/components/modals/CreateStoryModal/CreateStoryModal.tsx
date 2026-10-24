"use client";

import { CreateAction } from "@/actions/Story/Create.action";
import { bg_colors } from "@/data/StoryModal/bg_colors";
import { invalidateUserCaches } from "@/lib/invalidateUserCaches";
import { useUser } from "@/providers/UserProvider";
import { MediaType } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { FormProvider, useForm } from "react-hook-form";
import CreateStoryFormValues from "./_types/CreateStoryFormValues.type";
import Footer from "./Footer";
import Header from "./Header";
import SelectColor from "./SelectColor";
import UloadText from "./UloadText";
import UploadMedia from "./UploadMedia";
import { useActiveModal } from "@/providers/ActiveModalProvider";
// =================================================================
function CreateStoryModal() {
  const methods = useForm<CreateStoryFormValues>({
    defaultValues: {
      color: bg_colors[0],
    },
  });
  const { setActiveModal } = useActiveModal();
  const queryClient = useQueryClient();
  const userSession = useUser();
  const { watch, handleSubmit, setValue } = methods;
  // eslint-disable-next-line react-hooks/incompatible-library
  const selectedColor = watch("color");
  const { mutate, error, isPending } = useMutation({
    mutationFn: async (data: CreateStoryFormValues) => {
      const { content, preview, file } = data;
      if (!content && !preview) throw new Error("لا يمكنك إنشاء حالة فارغة.");
      let mediaUrl: { url: string; type: MediaType } | null = null;
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        try {
          const res = await axios.post("/api/upload-media", formData);
          mediaUrl = res.data;
        } catch (error) {
          console.error(error);
          if (axios.isAxiosError(error))
            throw new Error("حدث خطأ أثناء رفع الصورة / الفيديو الخاص بك.");
        }
      }
      const result = await CreateAction(
        mediaUrl?.url,
        content,
        mediaUrl?.type,
        selectedColor,
      );
      if (!result.success) throw new Error(result.message);
    },
    onSuccess: () => {
      setValue("content", "");
      setValue("preview", "");
      setValue("file", null);
      invalidateUserCaches(queryClient, userSession);
      setActiveModal(null);
    },
  });
  const handleCreateStory = (data: CreateStoryFormValues) => {
    mutate(data);
  };
  return (
    <FormProvider {...methods}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 backdrop-blur-xl bg-black/5 z-50 flex items-center justify-center"
      >
        <form
          onSubmit={handleSubmit(handleCreateStory)}
          className="overflow-y-auto w-200 max-h-180 rounded-2xl modalBgColor flex flex-col gap-7 p-3"
        >
          <Header />
          <div className="flex flex-col gap-5">
            <UploadMedia />
            <UloadText selectedColor={selectedColor} />
            <SelectColor selectedColor={selectedColor} />
          </div>
          <hr className="border-white/5" />
          <Footer error={error} isPending={isPending} />
        </form>
      </motion.div>
    </FormProvider>
  );
}

export default CreateStoryModal;
