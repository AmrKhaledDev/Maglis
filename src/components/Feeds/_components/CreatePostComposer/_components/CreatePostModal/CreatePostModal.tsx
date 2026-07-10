"use client";
import { useFieldArray, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import AddImages from "./_components/AddImages";
import AddVideos from "./_components/AddVideos";
import { PostModalFormType } from "../../_types/PostModalFormType";
import CreatePostModal_Head from "./_components/CreatePostModal_Head";
import CreatePostModal_Media from "./_components/CreatePostModal_Media";
// ===========================================================
function CreatePostModal({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostModalFormType>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "media",
  });
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/10 backdrop-blur z-40 flex items-center justify-center text-slate-800"
    >
      <form className="bg-slate-800 ring ring-gray-50/5 text-white shadow-2xl p-3 rounded-xl w-200 max-h-170 overflow-y-auto">
        <CreatePostModal_Head setIsOpen={setIsOpen} />
        <span className="w-full bg-white opacity-2 h-px rounded-full block mt-2 mb-5" />
        <TextareaAutosize
          {...register("content")}
          minRows={10}
          maxRows={15}
          placeholder="بماذا تفكر اليوم يا عمرو غفر الله له ؟"
          className="w-full p-2 rounded resize-none outline-none border border-gray-50/5 focus:border-gray-50/15 transition"
        />
        <CreatePostModal_Media media={fields} remove={remove} />
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <AddImages fields={fields} append={append} />
            <AddVideos fields={fields} append={append} />
          </div>
          <button className="text-sm hover:outline active:outline active:outline-blue-600 outline-offset-2 hover:outline-blue-600 bg-blue-600 text-white relative block py-2 w-30 shadow font-semibold cursor-pointer">
            نشر
          </button>
        </div>
      </form>
    </motion.div>
  );
}

export default CreatePostModal;
