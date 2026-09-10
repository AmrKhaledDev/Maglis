import { useActiveMenu } from "@/providers/ActiveMenuProvider";
import { motion } from "framer-motion";
import { UseFieldArrayAppend } from "react-hook-form";
import z from "zod";
import { CreateMessageSchema } from "@/ZodSchemas/Message/CreateMessage.schema";
import UploadImage from "./UploadImage";
import UploadVideo from "./UploadVideo";
import UploadPdf from "./UploadPdf";
// ===============================================================
function UploadFiles({
  fields,
  append,
}: {
  fields: ({
    mediaType: "IMAGE" | "VIDEO" | "PDF";
    mediaUrl: string;
    file: z.core.File;
  } & Record<"id", string>)[];
  append: UseFieldArrayAppend<z.infer<typeof CreateMessageSchema>, "media">;
}) {
  const { activeMenu } = useActiveMenu();
  return (
    <>
      {activeMenu === "upload_files" && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="boxMenu absolute -top-25 left-0 ring ring-white/10 bg-[#161717] p-1 flex flex-col rounded-xl shadow-2xl min-w-30"
        >
          <UploadImage fields={fields} append={append} />
          <UploadVideo />
          <UploadPdf />
        </motion.div>
      )}
    </>
  );
}

export default UploadFiles;
