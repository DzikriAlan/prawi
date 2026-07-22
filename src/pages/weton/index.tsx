import type { NextPage } from "next";
import Head from "next/head";

import { AppNavbar } from "@/shared/components/reusable/AppNavbar";
import WetonMain from "@/features/weton/components/wetonMain";

const Weton: NextPage = () => {
  return (
    <>
      <Head>
        <title>Kalkulator Weton</title>
        <meta name="description" content="Kalkulator Weton" />
      </Head>
      <AppNavbar />
      <main className="flex min-h-screen justify-center pb-24">
        <WetonMain />
      </main>
    </>
  );
};

export default Weton;
