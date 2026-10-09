import StartConversationModal from "@/components/modals/StartConversationModal/StartConversationModal";
import { useActiveModal } from "@/providers/ActiveModalProvider";
import Image from "next/image";
import Link from "next/link";
import { AiFillMessage } from "react-icons/ai";
// =====================================
function EmptyConversations() {
  const { activeModal, setActiveModal } = useActiveModal();
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="relative size-85">
          <Image
            src="/no_data_image.png"
            alt="no data image"
            fill
            priority
            className="object-contain"
          />
        </div>
        <div className="flex flex-col gap-4 items-center">
          <div className="flex flex-col gap-2.5 items-center">
            <h2 className="text-3xl">تبدو الصفحة فارغة</h2>
            <p className="text-gray-200">
              لا توجد محادثات بعد لماذا لا تبدأ واحدة جديدة؟
            </p>
          </div>
          <button
            onClick={() => setActiveModal("new_conversation")}
            className="py-1 px-6 font-medium hover:bg-gray-200 bg-gray-100 flex items-center gap-1.5 text-sm shadow cursor-pointer text-blue-800"
          >
            <AiFillMessage className="size-5 text-blue-700"/>
            بدء محادثة جديدة
          </button>
          <Link
            href={"/"}
            className="text-sm text-gray-400 hover:underline underline-offset-1"
          >
            الرجوع للصفحة الرئيسية
          </Link>
        </div>
      </div>
      {activeModal === "new_conversation" && <StartConversationModal />}
    </>
  );
}

export default EmptyConversations;
