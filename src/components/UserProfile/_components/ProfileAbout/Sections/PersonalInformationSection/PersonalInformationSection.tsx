import EditProfileTitleSection from "../../EditProfileTitleSection";
import Gender from "./Gender";
import { Control, UseFormSetValue } from "react-hook-form";
import { FormHookValues } from "../../../../_types/FormHookValues.type";
import City from "./City";
// ================================================================================
function PersonalInformationSection({
  setValue,
  control,
}: {
  setValue: UseFormSetValue<FormHookValues>;
  control: Control<FormHookValues>;
}) {
  return (
    <div className="profileSectionStyle">
      <EditProfileTitleSection title="المعلومات الشخصية" />
      <div className="profileSectionFieldsStyle">
        <Gender setValue={setValue} control={control} />
        <City setValue={setValue} control={control} />
      </div>
    </div>
  );
}

export default PersonalInformationSection;
