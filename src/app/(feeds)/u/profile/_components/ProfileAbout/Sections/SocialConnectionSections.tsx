import ProfileFormField from "../ProfileFormField";
import EditProfileTitleSection from "../EditProfileTitleSection";
// ==================================================================
function SocialConnectionsSection() {
  return (
    <div className="profileSectionStyle">
      <EditProfileTitleSection title="الروابط الإجتماعية" />
      <div className="profileSectionFieldsStyle">
        <ProfileFormField
          id="facebook"
          label="Facebook"
          typeField="INPUT"
          placeholder="أدخل الرابط"
        />
        <ProfileFormField
          id="x"
          label="X"
          typeField="INPUT"
          placeholder="أدخل الرابط"
        />
        <ProfileFormField
          id="linkedIn"
          label="LinkedIn"
          typeField="INPUT"
          placeholder="أدخل الرابط"
        />
        <ProfileFormField
          id="instagram"
          label="Instagram"
          typeField="INPUT"
          placeholder="أدخل الرابط"
        />
        <ProfileFormField
          id="github"
          label="Github"
          typeField="INPUT"
          placeholder="أدخل الرابط"
        />
      </div>
    </div>
  );
}

export default SocialConnectionsSection;
