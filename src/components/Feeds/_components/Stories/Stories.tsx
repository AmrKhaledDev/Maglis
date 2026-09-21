"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import StoryCard from "./_components/StoryCard";
import CreateStoryCard from "./_components/CreateStoryCard";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@/providers/UserProvider";
import { GetActiveStoriesAction } from "@/actions/Story/GetActiveStories.action";
import CreateStoryModal from "../../../modals/CreateStoryModal/CreateStoryModal";
import { useActiveModal } from "@/providers/ActiveModalProvider";
// =============================================================
function Stories() {
  const userSession = useUser();
  const { activeModal } = useActiveModal();
  const { data: userWithStories, isPending } = useQuery({
    queryFn: async () => {
      return await GetActiveStoriesAction(userSession.id);
    },
    queryKey: ["user_active_stories", userSession.id],
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
        {isPending ? (
          Array(6)
            .fill(0)
            .map((_, i) => (
              <SwiperSlide key={i} className="h-full! w-25!">
                <div className="flex flex-col items-center animate-pulse gap-2 justify-center shrink-0">
                  <span className="size-17 rounded-full bg-white/5 block shadow" />
                  <span className="w-18 h-1.5 block bg-white/5 rounded-full shadow" />
                </div>
              </SwiperSlide>
            ))
        ) : (
          <>
            {userWithStories && (
              <SwiperSlide key={userWithStories.id} className="h-full! w-25!">
                <StoryCard userWithStories={userWithStories} />
              </SwiperSlide>
            )}
            {userWithStories?.followings.map((following) => (
              <SwiperSlide
                key={following.following.id}
                className="h-full! w-25!"
              >
                <StoryCard userWithStories={following.following} />
              </SwiperSlide>
            ))}
          </>
        )}
      </Swiper>
      {activeModal == "create_story_modal" && <CreateStoryModal />}
    </>
  );
}

export default Stories;
