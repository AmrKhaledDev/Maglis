import CustomImageIcon from "@/components/CustomIcons/CustomImageIcon";
import handleFileUploadChatActions from "@/lib/helpers/handleFileUploadChatActions";
import UploadMediaPropsType from "../../_types/UploadMediaProps.type";
import Label from "./Label";
// ====================================================================
function UploadImage({ fields, append }: UploadMediaPropsType) {
  return (
    <div>
      <Label htmlFor="upload_image" icon={CustomImageIcon} text="الصور" />
      <input
        onChange={(e) => handleFileUploadChatActions(e, fields, append)}
        id="upload_image"
        type="file"
        accept="image/*"
        hidden
      />
    </div>
  );
}

export default UploadImage;
