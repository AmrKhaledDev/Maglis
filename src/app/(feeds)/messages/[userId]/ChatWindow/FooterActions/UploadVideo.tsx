import CustomVideoIcon from "@/components/CustomIcons/CustomVideoIcon";
import UploadMediaPropsType from "../../_types/UploadMediaProps.type";
import Label from "./Label";
import handleFileUploadChatActions from "@/lib/helpers/handleFileUploadChatActions";
// =====================================================================
function UploadVideo({ fields, append }: UploadMediaPropsType) {
  return (
    <div>
      <Label htmlFor="upload_video" icon={CustomVideoIcon} text="الفيديوهات" />
      <input
        onChange={(e) => handleFileUploadChatActions(e, fields, append)}
        id="upload_video"
        type="file"
        accept="video/*"
        hidden
      />
    </div>
  );
}

export default UploadVideo;
