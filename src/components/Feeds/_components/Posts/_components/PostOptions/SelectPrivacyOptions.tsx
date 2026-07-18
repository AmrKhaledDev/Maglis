import { privacyOptions } from "@/data/SelectPrivacy/PrivacyOptions";
import { motion } from "framer-motion";
import { UseFormSetValue } from "react-hook-form";
import { EditPostModalFormType } from "../../_types/EditPostModalForm.type";
import { PrivacyType } from "@/types/Privacy.type";
// ================================================================================
function SelectPrivacyOptions({
  setValue,
  privacy
}: {
  setValue: UseFormSetValue<EditPostModalFormType>;
  privacy:PrivacyType
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="absolute mt-1 w-25 gap-px boxPrivacyOptions shadow-2xl left-0 bg-gray-200 text-black font-semibold p-2 flex flex-col rounded-xl"
    >
      {privacyOptions.map((item) => (
        <button
          type="button"
          onClick={() => setValue("privacy", item)}
          className={`flex items-center gap-1 text-xs rounded p-1 mytransition
            ${privacy.value == item.value ?"bg-black text-white" :"hover:bg-black hover:text-white cursor-pointer"}
            `}
          key={item.value}
        >
          <item.icon className="size-4" />
          {item.label}
        </button>
      ))}
    </motion.div>
  );
}

export default SelectPrivacyOptions;
