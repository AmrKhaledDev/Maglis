import Image from "next/image";
import { useState } from "react";
import NoDataMessage from "./NoDataMessage";
import { useQuery } from "@tanstack/react-query";
import { GetUserImagesPostsAction } from "@/actions/User/GetUserImagesPosts.action";
import ProfileLoader from "./ProfileLoader";
import ImagePreviewModal from "@/components/ImagePreviewModal/ImagePreviewModal";
// ===================================================================
function UserImages({ userId }: { userId: string }) {
  const [showImage, setShowImage] = useState({
    open: false,
    url: "",
  });
  const {
    data: media,
    isPending,
    error,
  } = useQuery({
    queryFn: async () => {
      const result = await GetUserImagesPostsAction(userId);
      if (!result.success || !result.media)
        throw new Error(result.message || "حدث خطأ أثناء جلب الصور الخاصة بك.");
      return result.media;
    },
    queryKey: ["user_postsPhotos", userId],
  });
  if (isPending) return <ProfileLoader />;
  return (
    <div className="w-full flex justify-center">
      {media && media.length > 0 ? (
        <div className="grid grid-cols-4 gap-3 w-full ">
          {media.map((img) => (
            <button
              onClick={() =>
                setShowImage({
                  open: true,
                  url: img.url,
                })
              }
              key={img.id}
              className="relative rounded-xl overflow-hidden group cursor-pointer h-90"
            >
              <Image
                src={img.url}
                alt="صورة"
                width={200}
                height={200}
                className="object-cover hover:scale-105 mytransition w-full h-full  p-px bg-gray-50/5"
              />
              <span className="absolute inset-0 bg-black/20 group-hover:hidden" />
            </button>
          ))}
        </div>
      ) : (
        <NoDataMessage message={error?.message || "حالياً لا يوجد أي صور."} />
      )}
      {showImage.open && (
        <ImagePreviewModal showMedia={showImage} setShowMedia={setShowImage} />
      )}
    </div>
  );
}

export default UserImages;
