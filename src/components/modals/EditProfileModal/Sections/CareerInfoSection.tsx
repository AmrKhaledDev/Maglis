import { EditProfileSchema } from "@/ZodSchemas/EditProfile/EditProfile.schema";
import { useFormContext } from "react-hook-form";
import z from "zod";
import EditProfileTitleSection from "../EditProfileTitleSection";
import ProfileFormField from "../ProfileFormField";
import Label from "../Label";
// ====================================================
function CareerInfoSection({
  professionalMode,
}: {
  professionalMode: boolean;
}) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<z.infer<typeof EditProfileSchema>>();
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
          <Label label="الوضع الإحترافي" />
          <div className="flex items-center gap-2">
            <input
              onChange={() => setValue("professionalMode", !professionalMode)}
              checked={professionalMode}
              type="checkbox"
              id="professionalMode"
              className="border relative appearance-none size-4 rounded cursor-pointer hover:bg-slate-500 bg-slate-400 checked:after:content-['✔']  checked:after:text-white checked:after:absolute checked:after:top-1/2  checked:after:left-1/2 checked:after:-translate-y-1/2 checked:after:-translate-x-1/2 checked:bg-green-600 checked:border-green-500"
            />
            <label htmlFor="professionalMode" className="font-bold">
              تفعيل
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CareerInfoSection;
