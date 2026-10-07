import EditProfileTitleSection from "../../EditProfileTitleSection";
import City from "./City";
import Gender from "./Gender";
// ================================================================================
function PersonalInformationSection() {
  return (
    <div className="profileSectionStyle">
      <EditProfileTitleSection title="المعلومات الشخصية" />
      <div className="profileSectionFieldsStyle">
        <Gender />
        <City />
      </div>
    </div>
  );
}

export default PersonalInformationSection;
