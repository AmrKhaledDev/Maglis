import { Dispatch, SetStateAction, useEffect } from "react";
import EditProfileHeader from "./Header";
import BasicInfoSection from "./Sections/BasicInfoSection";
import CareerInfoSection from "./Sections/CareerInfoSection";
import PersonalInformationSection from "./Sections/PersonalInformationSection/PersonalInformationSection";
import SocialConnectionsSection from "./Sections/SocialConnectionSections";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditProfileSchema } from "@/ZodSchemas/EditProfile/EditProfile.schema";
import { FormHookValues } from "../../UserProfile/_types/FormHookValues.type";
import { UserWithSocialLinkType } from "../../UserProfile/_types/UserWithSocialLink.type";
import { SOCIAL_PLATFORMS } from "@/data/Profile/socialPlatforms";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AlertMessage from "@/components/AlertMessage/AlertMessage";
import { invalidateUserCaches } from "@/lib/invalidateUserCaches";
import { useUser } from "@/providers/UserProvider";
import Header from "./Header";
import { EditProfileAction } from "@/actions/User/EditProfile.action";
import ButtonSubmit from "./ButtonSubmit";
// =================================================================================
function EditProfileModal({
  setShowEditProfileModal,
  user,
  showEditProfileModal,
}: {
  setShowEditProfileModal: Dispatch<SetStateAction<boolean>>;
  user: UserWithSocialLinkType;
  showEditProfileModal: boolean;
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
  const userSession = useUser();
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (data: FormHookValues) => {
      const result = await EditProfileAction(user.id, data);
      if (!result.success) throw new Error(result.message);
    },
    onSuccess: () => {
      setShowEditProfileModal(false);
      invalidateUserCaches(queryClient, userSession);
    },
  });
  useEffect(() => {
    if (showEditProfileModal) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showEditProfileModal]);
  const onSubmit = (data: FormHookValues) => mutate(data);
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
        <div className="w-220 flex flex-col gap-10 bg-slate-900 max-h-170 overflow-y-auto shadow-2xl rounded-2xl p-5">
          <Header setShowEditProfileModal={setShowEditProfileModal} />
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
          {error && <AlertMessage type="error" message={error.message} />}
          <ButtonSubmit isPending={isPending} />
        </div>
      </form>
    </motion.div>
  );
}

export default EditProfileModal;
