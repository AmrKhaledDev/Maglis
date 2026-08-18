"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MediaType } from "@prisma/client";
import axios from "axios";
import { CreateStoryAction } from "@/actions/Story/CreateStory.action";
import { useUser } from "@/providers/UserProvider";
import CreateStoryModalHeader from "./CreateStoryModalHeader";
import CreateStoryModalUloadText from "./CreateStoryModalUloadText";
import CreateStoryModalSelectColor from "./CreateStoryModalSelectBgColor";
import CreateStoryModalFooter from "./CreateStoryModalFooter";
import CreateStoryModalUploadMedia from "./CreateStoryModalUploadMedia";
// =================================================================
function CreateStoryModal() {
  const [selectedColor, setSelectedColor] = useState("#4f46e5");
  const [mediaPreview, setMediaPreview] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [contentText, setContentText] = useState("");
  const queryClient = useQueryClient();
  const userSession = useUser();
  const {
    mutate: handleCreateStory,
    error,
    isPending,
  } = useMutation({
    mutationFn: async () => {
      if (!contentText && !mediaPreview)
        throw new Error("لا يمكنك إنشاء حالة فارغة.");
      let mediaUrl: { url: string; type: MediaType } | null = null;
      if (mediaFile) {
        const formData = new FormData();
        formData.append("file", mediaFile);
        try {
          const res = await axios.post("/api/upload-media", formData);
          mediaUrl = res.data;
        } catch (error) {
          console.error(error);
          if (axios.isAxiosError(error))
            throw new Error("حدث خطأ أثناء رفع الصورة / الفيديو الخاص بك.");
        }
      }
      const result = await CreateStoryAction(
        mediaUrl?.url,
        contentText,
        mediaUrl?.type,
        selectedColor,
      );
      if (!result.success) throw new Error(result.message);
    },
    onSuccess: () => {
      setContentText("");
      setMediaPreview("");
      setMediaFile(null);
      queryClient.invalidateQueries({
        queryKey: ["user_stories", userSession.id],
      });
    },
  });
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 backdrop-blur-xl bg-black/5 z-50 flex items-center justify-center"
    >
      <div className="overflow-y-auto w-200 max-h-180 rounded-2xl bg-slate-800 flex flex-col gap-7 p-3">
        <CreateStoryModalHeader />
        <div className="flex flex-col gap-5">
          <CreateStoryModalUploadMedia
            setMediaFile={setMediaFile}
            setMediaPreview={setMediaPreview}
            mediaPreview={mediaPreview}
            mediaFile={mediaFile}
          />
          <CreateStoryModalUloadText
            selectedColor={selectedColor}
            setContentText={setContentText}
            contentText={contentText}
          />
          <CreateStoryModalSelectColor
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
        </div>
        <hr className="border-white/5" />
        <CreateStoryModalFooter
          error={error}
          handleCreateStory={handleCreateStory}
          isPending={isPending}
        />
      </div>
    </motion.div>
  );
}

export default CreateStoryModal;
