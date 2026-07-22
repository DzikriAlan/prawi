import type { NextPage } from "next";
import Head from "next/head";

import { AppNavbar } from "@/shared/components/reusable/AppNavbar";
import StatusMain from "@/features/status/components/statusMain";

const Status: NextPage = () => {
  return (
    <>
      <Head>
        <title>Pembaruan</title>
        <meta name="description" content="Status dan saluran terbaru" />
      </Head>
      <AppNavbar />
      <main className="flex min-h-screen justify-center pb-24">
        <StatusMain />
      </main>
    </>
  );
};

export default Status;
