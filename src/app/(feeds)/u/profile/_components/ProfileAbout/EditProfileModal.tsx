import { Dispatch, SetStateAction } from "react";
import EditProfileHeader from "./EditProfileHeader";
import BasicInfoSection from "./Sections/BasicInfoSection";
import CareerInfoSection from "./Sections/CareerInfoSection";
import PersonalInformationSection from "./Sections/PersonalInformationSection";
import SocialConnectionsSection from "./Sections/SocialConnectionSections";
import { motion } from "framer-motion";
// =================================================================================
function EditProfileModal({
  setShowEditProfileModal,
}: {
  setShowEditProfileModal: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 text-slate-400 bg-black/20 z-40 backdrop-blur flex items-center justify-center"
    >
      <div className="overflow-hidden rounded-2xl editProfileModal">
        <div className="w-220 flex flex-col gap-10 bg-slate-800 max-h-170 overflow-y-auto shadow-2xl rounded-2xl p-5">
          <EditProfileHeader
            setShowEditProfileModal={setShowEditProfileModal}
          />
          <div className="flex flex-col gap-10">
            <BasicInfoSection />
            <CareerInfoSection />
            <PersonalInformationSection />
            <SocialConnectionsSection />
          </div>
          <button className="py-3 px-10 w-fit hover:outline-2 outline-slate-950 outline-offset-2 active:scale-95 mytransition shadow bg-slate-950 font-semibold cursor-pointer">
            تعديل الملف الشخصي
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default EditProfileModal;
