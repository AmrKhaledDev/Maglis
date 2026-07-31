import EditProfileLable from "../EditProfileLable";
import EditProfileTitleSection from "../EditProfileTitleSection";
import ProfileFormField from "../ProfileFormField";
// ====================================================
function CareerInfoSection() {
  return (
    <div className="profileSectionStyle">
      <EditProfileTitleSection title="المعلومات المهنية" />
      <div className="profileSectionFieldsStyle">
        <ProfileFormField
          id="jopTitle"
          label="المسمى الوظيفي"
          placeholder="أكتب المسمى الوظيفي الخاص بك"
          typeField="INPUT"
        />
        <ProfileFormField
          id="jopTitle"
          label="التعليم"
          placeholder="اسم المدرسة / الكلية / الجامعة"
          typeField="INPUT"
        />
        <div className="flex flex-col gap-2">
          <EditProfileLable label="الوضع الإحترافي" />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="border relative appearance-none size-4 rounded cursor-pointer hover:bg-slate-500 bg-slate-400
                    checked:after:content-['✔'] 
                  checked:after:text-white
                    checked:after:absolute
                    checked:after:top-1/2
                    checked:after:left-1/2
                    checked:after:-translate-y-1/2
                    checked:after:-translate-x-1/2
                    checked:bg-green-600
                    checked:border-green-300
                    "
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
