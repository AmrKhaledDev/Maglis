"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
// ===============================================================
const PlayingVideoIdContext = createContext<{
  playingVideoId: string | null;
  setPlayingVideoId: Dispatch<SetStateAction<string | null>>;
} | null>(null);
export function PlayingVideoIdProvider({ children }: { children: ReactNode }) {
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  return (
    <PlayingVideoIdContext.Provider
      value={{ playingVideoId, setPlayingVideoId }}
    >
      {children}
    </PlayingVideoIdContext.Provider>
  );
}

export function usePlayingVideoId() {
  const context = useContext(PlayingVideoIdContext);
  if (!context)
    throw new Error(
      "usePlayingVideoId must be used within a PlayingVideoIdProvider",
    );
  return context;
}
