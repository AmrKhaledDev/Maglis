import PdfThumbnail from "@/components/PdfThumbnail/PdfThumbnail";
import clsx from "clsx";
import MediaListProps from "../../../_types/MediaListProps.type";
import AddMedia from "./AddMedia";
import DeleteField from "./DeleteField";
import ImageMedia from "./ImageMedia";
import VideoMedia from "./VideoMedia";
// ======================================================================
function MediaList({
  fields,
  setCurrentMedia,
  currentMedia,
  remove,
  append,
}: MediaListProps) {
  return (
    <div className="flex items-center gap-3">
      {fields.map((field, i) => (
        <div
          onClick={() =>
            setCurrentMedia({
              id: field.id,
              mediaType: field.type,
              mediaUrl: field.url,
            })
          }
          key={field.id}
          className={clsx(
            "relative size-15 rounded-md overflow-hidden",
            currentMedia.id === field.id
              ? "border-3 border-green-600 scale-115"
              : "cursor-pointer",
          )}
        >
          <ImageMedia field={field} />
          <VideoMedia field={field} />
          {/* ===== PDF ===== */}
          {field.type === "PDF" && (
            <PdfThumbnail pdfUrl={field.url} />
          )}
          {/* ===== PDF ===== */}
          <DeleteField index={i} remove={remove} />
          <span className="absolute inset-0 bg-black/20" />
        </div>
      ))}
      <AddMedia fields={fields} append={append} />
    </div>
  );
}

export default MediaList;
