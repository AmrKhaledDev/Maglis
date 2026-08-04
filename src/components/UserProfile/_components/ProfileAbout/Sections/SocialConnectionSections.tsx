import ProfileFormField from "../ProfileFormField";
import EditProfileTitleSection from "../EditProfileTitleSection";
import { FieldErrors, Path, UseFormRegister } from "react-hook-form";
import { FormHookValues } from "../../../_types/FormHookValues.type";
// ==================================================================
function SocialConnectionsSection({
  register,
  errors,
}: {
  register: UseFormRegister<FormHookValues>;
  errors: FieldErrors<FormHookValues>;
}) {
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
