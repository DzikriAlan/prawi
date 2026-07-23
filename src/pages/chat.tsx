import type { NextPage } from "next";
import Head from "next/head";

import { AppNavbar } from "@/shared/components/reusable/AppNavbar";
import { AppSidebarNav } from "@/shared/components/reusable/AppSidebarNav";
import ChatMain from "@/features/chat/components/chatMain";
import WetonMain from "@/features/weton/components/wetonMain";

const Chat: NextPage = () => {
  return (
    <>
      <Head>
        <title>Obrolan</title>
        <meta name="description" content="Percakapan dan riwayat obrolan" />
      </Head>
      <AppNavbar />
      <AppSidebarNav />
      <main className="flex h-[100dvh] overflow-hidden bg-background md:pl-16">
        <ChatMain detailPanel={<WetonMain />} />
      </main>
    </>
  );
};

export default Chat;
