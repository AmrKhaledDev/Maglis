import { useEffect, useState } from "react";
import SelectedMediaPreviewPropsType from "../../../_types/SelectedMediaPreviewProps.type";
import ButtonCreateMessage from "./ButtonCreateMessage";
import CloseModal from "./CloseModal";
import CurrentMedia from "./CurrentMedia";
import DiscardMediaModal from "../../../../../../../components/modals/DiscardMediaModal";
import MediaList from "./MediaList";
import MessageInput from "./MessageInput";
// =====================================================================
function SelectedMediaPreview({
  fields,
  append,
  remove,
  isPending,
}: SelectedMediaPreviewPropsType) {
  const [currentMedia, setCurrentMedia] = useState({
    id: fields.at(-1)?.id || "",
    mediaUrl: fields.at(-1)?.url || "",
    mediaType: fields.at(-1)?.type || "",
  });
  useEffect(() => {
    const lastMedia = fields.at(-1);
    if (!lastMedia) return;
    setCurrentMedia({
      id: lastMedia.id,
      mediaUrl: lastMedia.url,
      mediaType: lastMedia.type,
    });
  }, [fields]);
  const [showDiscardMediaModal, setShowDiscardMediaModal] = useState(false);
  return (
    <div className="fixed justify-center inset-0 bg-[#161717] backdrop-blur-[10px] flex flex-col gap-5 z-100 pt-15 items-center">
      {showDiscardMediaModal && (
        <DiscardMediaModal
          setShowDiscardMediaModal={setShowDiscardMediaModal}
          remove={remove}
        />
      )}
      <CloseModal setShowDiscardMediaModal={setShowDiscardMediaModal} />
      <ButtonCreateMessage
        fields={fields}
        isPending={isPending}
      />
      <CurrentMedia currentMedia={currentMedia} />
      <MessageInput />
      <MediaList
        fields={fields}
        append={append}
        setCurrentMedia={setCurrentMedia}
        currentMedia={currentMedia}
        remove={remove}
      />
    </div>
  );
}

export default SelectedMediaPreview;
