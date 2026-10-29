"use client"
import { createContext, ReactNode, useContext, useState } from "react";
import { RepliesStateProviderType } from "./types/RepliesStateProvider.type";
import { Comment } from "@/types/Comment.type";
// ============================================================================
const RepliesStateContext = createContext<RepliesStateProviderType | null>(
  null,
);
export function RepliesStateProvider({ children }: { children: ReactNode }) {
  const [currentReply, setCurrentReply] = useState<Comment | null>(null);
  const [showReplyComposer, setShowReplyComposer] = useState("");
  return (
    <RepliesStateContext.Provider
      value={{
        currentReply,
        setCurrentReply,
        showReplyComposer,
        setShowReplyComposer,
      }}
    >
      {children}
    </RepliesStateContext.Provider>
  );
}

export function useRepliesState() {
  const context = useContext(RepliesStateContext);
  if (!context) throw new Error("Hook must be used within its Provider");
  return context;
}
