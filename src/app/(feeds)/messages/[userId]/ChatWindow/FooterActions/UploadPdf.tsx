import CustomFileIcon from "@/components/CustomIcons/CustomFileIcon";
import Label from "./Label";
import UploadMediaPropsType from "../../_types/UploadMediaProps.type";
import handleFileUploadChatActions from "@/lib/helpers/handleFileUploadChatActions";
// =====================================================================
function UploadPdf({ fields, append }: UploadMediaPropsType) {
  return (
    <div>
      <Label htmlFor="upload_pdf" icon={CustomFileIcon} text="مستند" />
      <input
        onChange={(e) => handleFileUploadChatActions(e, fields, append)}
        id="upload_pdf"
        type="file"
        accept=".pdf"
        hidden
      />
    </div>
  );
}

export default UploadPdf;
