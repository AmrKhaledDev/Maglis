import EditProfileTitleSection from "../EditProfileTitleSection";
import EditProfileLable from "../EditProfileLable";
import { IoMdArrowDropdown } from "react-icons/io";
// =====================================================
function PersonalInformationSection() {
  return (
    <div className="profileSectionStyle">
      <EditProfileTitleSection title="المعلومات الشخصية" />
      <div className="profileSectionFieldsStyle">
        <div className="flex flex-col gap-1">
          <EditProfileLable label="الجنس" />
          <button className="flex hover:bg-slate-950 mytransition items-center gap-5 justify-between rounded w-80 p-2 bg-slate-900 shadow cursor-pointer">
            أختر الجنس
            <IoMdArrowDropdown />
          </button>
        </div>
        <div className="flex flex-col gap-1">
          <EditProfileLable label="الدولة" />
          <button className="flex hover:bg-slate-950 mytransition items-center gap-5 justify-between rounded w-80 p-2 bg-slate-900 shadow cursor-pointer">
            أختر الدولة
            <IoMdArrowDropdown />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PersonalInformationSection;
