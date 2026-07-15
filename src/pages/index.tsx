import type { NextPage } from "next";
import Head from "next/head";

import WetonMain from "@/features/weton/components/wetonMain";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Kalkulator Weton</title>
        <meta name="description" content="Kalkulator Weton" />
      </Head>
      <main className="flex min-h-screen justify-center">
        <WetonMain />
      </main>
    </>
  );
};

export default Home;
