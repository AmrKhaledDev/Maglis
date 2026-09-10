import CustomFileIcon from "@/components/CustomIcons/CustomFileIcon";
import Label from "./Label";
// =====================================================================
function UploadPdf() {
  return (
    <div>
      <Label htmlFor="upload_pdf" icon={CustomFileIcon} text="مستند" />
      <input id="upload_pdf" type="file" accept=".pdf" hidden />
    </div>
  );
}

export default UploadPdf;
