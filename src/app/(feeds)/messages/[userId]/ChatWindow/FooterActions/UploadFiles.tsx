import { useActiveMenu } from "@/providers/ActiveMenuProvider";
import { motion } from "framer-motion";
import UploadMediaPropsType from "../../_types/UploadMediaProps.type";
import UploadImage from "./UploadImage";
import UploadPdf from "./UploadPdf";
import UploadVideo from "./UploadVideo";
// ===============================================================
function UploadFiles({
  fields,
  append,
}:UploadMediaPropsType) {
  const { activeMenu } = useActiveMenu();
  return (
    <>
      {activeMenu === "upload_files" && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="boxMenu absolute -top-27 left-1 ring ring-white/10 bg-[#161717] p-1 flex flex-col rounded-xl shadow-2xl min-w-30"
        >
          <UploadImage fields={fields} append={append} />
          <UploadVideo fields={fields} append={append}/>
          <UploadPdf fields={fields} append={append}/>
        </motion.div>
      )}
    </>
  );
}

export default UploadFiles;
