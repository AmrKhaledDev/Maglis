import handleFileUploadChatActions from "@/lib/helpers/handleFileUploadChatActions";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import UploadMediaPropsType from "../../../_types/UploadMediaProps.type";
// ==========================================
function AddMedia({ fields, append }: UploadMediaPropsType) {
  return (
    <>
      {fields.length < 4 && (
        <motion.label
          whileHover={{ scale: 1.05 }}
          htmlFor="upload_file"
          className="size-15 border rounded-md flex items-center justify-center  shadow cursor-pointer active:scale-90 bg-white/5 border-white/5 "
        >
          <Plus strokeWidth={1.5} className="size-5" />
        </motion.label>
      )}
      <input
        onChange={(e) => {
          handleFileUploadChatActions(e, fields, append);
        }}
        id="upload_file"
        type="file"
        accept="image/*, video/*, .pdf"
        hidden
      />
    </>
  );
}

export default AddMedia;
