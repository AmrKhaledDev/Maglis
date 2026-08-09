import { getVideos } from "@/cached-queries/getVideos";
import VideosContainer from "./_components/VideosContainer";
// ===================================================================================
async function Videos() {
  const videos = await getVideos();
  return (
    <div className="w-full min-h-[89vh] bg-black/30">
      <VideosContainer videos={videos} />
    </div>
  );
}

export default Videos;
