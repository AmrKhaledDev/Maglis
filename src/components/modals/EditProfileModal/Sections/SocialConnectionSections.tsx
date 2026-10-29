import { EditProfileSchema } from "@/zodSchemas/EditProfile/EditProfile.schema";
import { Path, useFormContext } from "react-hook-form";
import z from "zod";
import { FormHookValues } from "../../../UserProfile/_types/FormHookValues.type";
import EditProfileTitleSection from "../EditProfileTitleSection";
import ProfileFormField from "../ProfileFormField";
// ==================================================================
function SocialConnectionsSection() {
  const {
    formState: { errors },
    register,
  } = useFormContext<z.infer<typeof EditProfileSchema>>();
  const socialPlatforms = [
    { id: "facebook", label: "Facebook", error: errors.facebook?.message },
    { id: "x", label: "X", error: errors.x?.message },
    { id: "linkedIn", label: "LinkedIn", error: errors.linkedIn?.message },
    { id: "instagram", label: "Instagram", error: errors.instagram?.message },
    { id: "github", label: "GitHub", error: errors.github?.message },
  ];
  return (
    <div className="profileSectionStyle">
      <EditProfileTitleSection title="الروابط الإجتماعية" />
      <div className="profileSectionFieldsStyle">
        {socialPlatforms.map((platform) => (
          <ProfileFormField
            key={platform.id}
            id={platform.id as Path<FormHookValues>}
            label={platform.label}
            typeField="INPUT"
            placeholder="أدخل الرابط"
            register={register}
            error={platform.error}
          />
        ))}
      </div>
    </div>
  );
}

export default SocialConnectionsSection;
