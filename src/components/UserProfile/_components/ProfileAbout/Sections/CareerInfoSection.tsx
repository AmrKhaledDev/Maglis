import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import EditProfileLable from "../EditProfileLable";
import EditProfileTitleSection from "../EditProfileTitleSection";
import ProfileFormField from "../ProfileFormField";
import { FormHookValues } from "../../../_types/FormHookValues.type";
// ====================================================
function CareerInfoSection({
  register,
  errors,
  professionalMode,
  setValue,
}: {
  register: UseFormRegister<FormHookValues>;
  errors: FieldErrors<FormHookValues>;
  professionalMode: boolean;
  setValue: UseFormSetValue<FormHookValues>;
}) {
  return (
    <div className="profileSectionStyle">
      <EditProfileTitleSection title="المعلومات المهنية" />
      <div className="profileSectionFieldsStyle">
        <ProfileFormField
          id="jopTitle"
          label="المسمى الوظيفي"
          placeholder="أكتب المسمى الوظيفي الخاص بك"
          typeField="INPUT"
          register={register}
          error={errors.jopTitle?.message}
        />
        <ProfileFormField
          id="education"
          label="التعليم"
          placeholder="اسم المدرسة / الكلية / الجامعة"
          typeField="INPUT"
          register={register}
          error={errors.education?.message}
        />
        <div className="flex flex-col gap-2">
          <EditProfileLable label="الوضع الإحترافي" />
          <div className="flex items-center gap-2">
            <input
              onChange={() => setValue("professionalMode", !professionalMode)}
              checked={professionalMode}
              type="checkbox"
              className="border relative appearance-none size-4 rounded cursor-pointer hover:bg-slate-500 bg-slate-400 checked:after:content-['✔']  checked:after:text-white checked:after:absolute checked:after:top-1/2  checked:after:left-1/2 checked:after:-translate-y-1/2 checked:after:-translate-x-1/2 checked:bg-green-600 checked:border-green-500"
            />
            <label htmlFor="" className="font-bold">
              تفعيل
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CareerInfoSection;
