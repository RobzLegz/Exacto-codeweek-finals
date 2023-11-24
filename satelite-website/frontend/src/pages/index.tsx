import { Inter } from "next/font/google";
import Head from "next/head";
import Header from "../components/Header";
import Description from "../components/Description";
import Footer from "../components/Footer";
import Links from "@/components/Links";
import Satelite from "@/components/Satelite";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`${inter.className} w-full min-h-screen flex flex-col`}>
      <Head>
        <title>LatSat - Off grid satelite network</title>
      </Head>

      <Header />

      <Satelite />

      <Description />

      <Links />

      <Footer />
    </main>
  );
}
