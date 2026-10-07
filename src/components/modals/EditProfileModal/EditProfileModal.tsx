import { EditProfileAction } from "@/actions/User/EditProfile.action";
import AlertMessage from "@/components/AlertMessage/AlertMessage";
import { SOCIAL_PLATFORMS } from "@/data/Profile/socialPlatforms";
import { invalidateUserCaches } from "@/lib/invalidateUserCaches";
import { useUser } from "@/providers/UserProvider";
import { EditProfileSchema } from "@/ZodSchemas/EditProfile/EditProfile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FormProvider, useForm } from "react-hook-form";
import { FormHookValues } from "../../UserProfile/_types/FormHookValues.type";
import { UserWithSocialLinkType } from "../../UserProfile/_types/UserWithSocialLink.type";
import ButtonSubmit from "./ButtonSubmit";
import Header from "./Header";
import BasicInfoSection from "./Sections/BasicInfoSection";
import CareerInfoSection from "./Sections/CareerInfoSection";
import PersonalInformationSection from "./Sections/PersonalInformationSection/PersonalInformationSection";
import SocialConnectionsSection from "./Sections/SocialConnectionSections";
import { useActiveModal } from "@/providers/ActiveModalProvider";
// =================================================================================
function EditProfileModal({ user }: { user: UserWithSocialLinkType }) {
  const socialLinks = Object.fromEntries(
    user.socialLinks.map((link) => [link.platform, link.link]),
  );
  const socialDefault = Object.fromEntries(
    SOCIAL_PLATFORMS.map((item) => [
      item.formKey,
      socialLinks[item.platform] || "",
    ]),
  );
  const methods = useForm({
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
  const { handleSubmit, watch } = methods;
  const professionalMode = watch("professionalMode");
  const userSession = useUser();
  const queryClient = useQueryClient();
  const { setActiveModal } = useActiveModal();
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (data: FormHookValues) => {
      const result = await EditProfileAction(user.id, data);
      if (!result.success) throw new Error(result.message);
    },
    onSuccess: () => {
      setActiveModal(null);
      invalidateUserCaches(queryClient, userSession);
    },
  });
  const onSubmit = (data: FormHookValues) => mutate(data);
  return (
    <FormProvider {...methods}>
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
          <div className="w-220 flex flex-col gap-10 bg-[#14161B] max-h-170 overflow-y-auto shadow-2xl rounded-2xl p-5">
            <Header />
            <div className="flex flex-col gap-10">
              <BasicInfoSection />
              <CareerInfoSection professionalMode={professionalMode} />
              <PersonalInformationSection />
              <SocialConnectionsSection />
            </div>
            {error && <AlertMessage type="error" message={error.message} />}
            <div className="flex items-center gap-7">
              <ButtonSubmit isPending={isPending} />
              <button
                onClick={() => setActiveModal(null)}
                className="cursor-pointer hover:text-white"
              >
                إلغاء
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </FormProvider>
  );
}

export default EditProfileModal;
