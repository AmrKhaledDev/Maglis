import MediaFieldType from "../../../_types/MediaFileld.type";
import ReactPlayer from "react-player";
// ========================================================
function VideoMedia({ field }: { field: MediaFieldType }) {
  return (
    <>
      {field.type === "VIDEO" && (
        <ReactPlayer
          src={field.type}
          width="100%"
          height="100%"
          className="bg-black"
        />
      )}
    </>
  );
}

export default VideoMedia;
