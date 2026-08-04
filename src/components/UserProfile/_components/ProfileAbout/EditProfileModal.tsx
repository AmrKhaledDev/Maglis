import { Dispatch, SetStateAction } from "react";
import EditProfileHeader from "./EditProfileHeader";
import BasicInfoSection from "./Sections/BasicInfoSection";
import CareerInfoSection from "./Sections/CareerInfoSection";
import PersonalInformationSection from "./Sections/PersonalInformationSection/PersonalInformationSection";
import SocialConnectionsSection from "./Sections/SocialConnectionSections";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditProfileSchema } from "@/ZodSchemas/EditProfile/EditProfile.schema";
import { FormHookValues } from "../../_types/FormHookValues.type";
import { UserWithSocialLinkType } from "../../_types/UserWithSocialLink.type";
import { SOCIAL_PLATFORMS } from "@/data/Profile/socialPlatforms";
// =================================================================================
function EditProfileModal({
  setShowEditProfileModal,
  user,
}: {
  setShowEditProfileModal: Dispatch<SetStateAction<boolean>>;
  user: UserWithSocialLinkType;
}) {
  const socialLinks = Object.fromEntries(
    user.socialLinks.map((link) => [link.platform, link.link]),
  );
  const socialDefault = Object.fromEntries(
    SOCIAL_PLATFORMS.map((item) => [
      item.formKey,
      socialLinks[item.platform] || "",
    ]),
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      name: user.name || "",
      nickname: user.nickname || "",
      username: user.username || "",
      bio: user.bio || "",
      jopTitle: user.jobTitle || "",
      education: user.education || "",
      professionalMode: user.professionalMode,
      gender: user.gender || "",
      city: user.city || "",
      ...socialDefault,
    },
  });
  const professionalMode = watch("professionalMode");
  const onSubmit = (data: FormHookValues) => console.log(data);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 text-slate-400 bg-black/20 z-40 backdrop-blur flex items-center justify-center"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="overflow-hidden rounded-2xl editProfileModal"
      >
        <div className="w-220 flex flex-col gap-10 bg-slate-800 max-h-170 overflow-y-auto shadow-2xl rounded-2xl p-5">
          <EditProfileHeader
            setShowEditProfileModal={setShowEditProfileModal}
          />
          <div className="flex flex-col gap-10">
            <BasicInfoSection register={register} errors={errors} />
            <CareerInfoSection
              setValue={setValue}
              professionalMode={professionalMode}
              register={register}
              errors={errors}
            />
            <PersonalInformationSection control={control} setValue={setValue} />
            <SocialConnectionsSection register={register} errors={errors} />
          </div>
          <button className="py-3 px-10 rounded-full text-sm w-fit hover:outline-2 outline-slate-950 outline-offset-2 active:scale-95 mytransition shadow bg-slate-950 font-semibold cursor-pointer">
            تعديل الملف الشخصي
          </button>
        </div>
      </form>
    </motion.div>
  );
}

export default EditProfileModal;
