import GetSession from "@/auth/GetSession";
import ActiveMenuProvider from "@/providers/ActiveMenuProvider";
import ActiveModalProvider from "@/providers/ActiveModalProvider";
import { PlayingVideoIdProvider } from "@/providers/PlayingVideoIdProvider";
import QueryProvider from "@/providers/QueryProvider";
import { RepliesStateProvider } from "@/providers/RepliesStateProvider";
import { UserProvider } from "@/providers/UserProvider";
import { ReactNode } from "react";
import { TooltipProvider } from "../components/ui/tooltip";
import { ToastProvider } from "@/providers/ToastProvider";
// =================================================
async function Providers({ children }: { children: ReactNode }) {
  const userSession = await GetSession();
  return (
    <QueryProvider>
      <UserProvider user={userSession}>
        <RepliesStateProvider>
          <PlayingVideoIdProvider>
            <ActiveMenuProvider>
              <ActiveModalProvider>
                <TooltipProvider>
                  <ToastProvider>{children}</ToastProvider>
                </TooltipProvider>
              </ActiveModalProvider>
            </ActiveMenuProvider>
          </PlayingVideoIdProvider>
        </RepliesStateProvider>
      </UserProvider>
    </QueryProvider>
  );
}

export default Providers;
