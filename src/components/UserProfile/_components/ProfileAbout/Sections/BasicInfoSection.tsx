import { FieldErrors, UseFormRegister } from "react-hook-form";
import EditProfileTitleSection from "../EditProfileTitleSection";
import ProfileFormField from "../ProfileFormField";
import { FormHookValues } from "../../../_types/FormHookValues.type";
// ===============================================
function BasicInfoSection({
  register,
  errors,
}: {
  register: UseFormRegister<FormHookValues>;
  errors: FieldErrors<FormHookValues>;
}) {
  return (
    <div className="profileSectionStyle">
      <EditProfileTitleSection title="المعلومات الأساسية" />
      <div className="profileSectionFieldsStyle">
        <ProfileFormField
          id="name"
          placeholder="أكتب إسمك"
          label="الإسم"
          typeField="INPUT"
          register={register}
          error={errors.name?.message}
        />
        <ProfileFormField
          id="nickname"
          placeholder="أكتب إسم الشهرة الخاص بك"
          label="إسم الشهرة"
          typeField="INPUT"
          register={register}
          error={errors.name?.message}
        />
        <ProfileFormField
          id="username"
          placeholder="أضف إسم مستخدم خاص بك"
          label="إسم المستخدم"
          typeField="INPUT"
          register={register}
          error={errors.name?.message}
        />
        <ProfileFormField
          id="bio"
          placeholder="أكتب النبذه الشخصية الخاصة بك"
          label="النبذة الشخصية"
          typeField="TEXTAREA"
          register={register}
          error={errors.bio?.message}
        />
      </div>
    </div>
  );
}

export default BasicInfoSection;
