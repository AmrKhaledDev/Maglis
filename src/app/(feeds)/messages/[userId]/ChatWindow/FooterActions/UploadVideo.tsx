import CustomVideoIcon from "@/components/CustomIcons/CustomVideoIcon";
import Label from "./Label";
// =====================================================================
function UploadVideo() {
  return (
    <div>
      <Label htmlFor="upload_video" icon={CustomVideoIcon} text="الفيديوهات" />
      <input id="upload_video" type="file" accept="video/*" hidden />
    </div>
  );
}

export default UploadVideo;
