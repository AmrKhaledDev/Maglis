import { Images } from "lucide-react";
import FieldType from "./_types/Field.type";
// ======================================
function MediaLength({ fields }: { fields: FieldType[] }) {
  return (
    <>
      {fields.length > 0 && (
        <div className="text-gray-300 mt-4 flex flex-col items-center w-fit gap-0.5">
          <Images className="size-4" strokeWidth={2} />
          <p className="font-normal text-xs">{fields.length} / 4</p>
        </div>
      )}
    </>
  );
}

export default MediaLength;
