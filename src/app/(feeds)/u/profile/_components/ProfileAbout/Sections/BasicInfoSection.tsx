import EditProfileTitleSection from "../EditProfileTitleSection";
import ProfileFormField from "../ProfileFormField";
// ===============================================
function BasicInfoSection() {
  return (
    <div className="profileSectionStyle">
      <EditProfileTitleSection title="المعلومات الأساسية" />
      <div className="profileSectionFieldsStyle">
        <ProfileFormField
          id="name"
          placeholder="أكتب إسمك"
          label="الإسم"
          typeField="INPUT"
        />
        <ProfileFormField
          id="nickname"
          placeholder="أكتب إسم الشهرة الخاص بك"
          label="إسم الشهرة"
          typeField="INPUT"
        />
        <ProfileFormField
          id="username"
          placeholder="أضف إسم مستخدم خاص بك"
          label="إسم المستخدم"
          typeField="INPUT"
        />
        <ProfileFormField
          id="bio"
          placeholder="أكتب النبذه الشخصية الخاصة بك"
          label="النبذة الشخصية"
          typeField="TEXTAREA"
        />
      </div>
    </div>
  );
}

export default BasicInfoSection;
