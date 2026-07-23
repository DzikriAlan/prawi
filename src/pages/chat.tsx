import type { NextPage } from "next";
import Head from "next/head";

import { AppNavigation } from "@/shared/components/reusable/AppNavigation";
import { useExploreStore } from "@/shared/lib/exploreStore";
import { cn } from "@/shared/lib/utils";
import ChatMain from "@/features/chat/components/chatMain";
import WetonMain from "@/features/weton/components/wetonMain";

const Chat: NextPage = () => {
  // 9. Store / Controller
  const isImmersive = useExploreStore((state) => state.isImmersive);

  return (
    <>
      <Head>
        <title>Obrolan</title>
        <meta name="description" content="Percakapan dan riwayat obrolan" />
      </Head>
      <AppNavigation />
      <main
        className={cn(
          "flex h-[100dvh] overflow-hidden bg-background md:pl-16",
          !isImmersive && "pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:pb-0"
        )}
      >
        <ChatMain detailPanel={<WetonMain />} />
      </main>
    </>
  );
};

export default Chat;
