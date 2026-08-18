"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import StoryCard from "./_components/StoryCard";
import CreateStoryCard from "./_components/CreateStoryCard";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@/providers/UserProvider";
import { GetActiveStoriesAction } from "@/actions/Story/GetActiveStories.action";
import CreateStoryModal from "./_components/CreateStoryModal/CreateStoryModal";
import { useActiveModal } from "@/providers/ActiveModalProvider";
// =============================================================
function Stories() {
  const user = useUser();
  const { activeModal } = useActiveModal();
  const { data, isPending } = useQuery({
    queryFn: async () => {
      const result = await GetActiveStoriesAction(user.id);
      return result?.stories || [];
    },
    queryKey: ["user_stories", user.id],
  });
  return (
    <>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={6}
        className="w-full h-30 rounded shadow"
      >
        <SwiperSlide className="h-full! w-20!">
          <CreateStoryCard />
        </SwiperSlide>
        {!isPending ? (
          <SwiperSlide className="h-full! w-25!">
            <StoryCard stories={data} />
          </SwiperSlide>
        ) : (
          Array(7)
            .fill(0)
            .map((_, i) => (
              <SwiperSlide key={i} className="h-full! w-25!">
                <div className="flex flex-col items-center animate-pulse gap-2 justify-center shrink-0">
                  <div className="size-17 rounded-full bg-gray-500/30" />
                  <span className="w-18 h-1.5 block bg-gray-500/30 rounded-full" />
                </div>
              </SwiperSlide>
            ))
        )}
      </Swiper>
      {activeModal == "create_story_modal" && <CreateStoryModal />}
    </>
  );
}

export default Stories;
