import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Navigation from "../components/navigation/Navigation";
import Footer from "../components/navigation/Footer";
import * as ReactGA from "react-ga";

ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS);

interface PageModuleProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
  keywords?: string;
  ogImage?: string;
  ogImageAlt?: string;
}

const PageModule: NextPage<PageModuleProps> = ({
  title,
  description,
  children,
  className = "",
  ogImage = "/images/hero.jpg",
  ogImageAlt = "Exacto",
  keywords = "",
}) => {
  return (
    <main className={className}>
      <Head>
        <title>{title}</title>
        <meta name="og:title" content={title} />
        <meta name="twitter:title" content={title} />
        <meta name="description" content={description} />
        <meta name="og:description" content={description} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:creator" content="@spotlocapp" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content={keywords} />
        <meta property="og:type" content="website" />
        <meta property="twitter:site" content="@spotlocapp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImage} />
        <meta name="og:image" content={ogImage} />
        <meta property="og:site_name" content="Spotloc"></meta>
        <meta name="twitter:domain" content="spotloc.lv"></meta>
        <meta property="og:image:alt" content={ogImageAlt}></meta>
        <meta property="twitter:image:alt" content={ogImageAlt}></meta>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
          rel="stylesheet"
        ></link>
      </Head>

      <Navigation />

      <div
        className={`w-full max-w-[1200px] flex flex-col items-center justify-start min-h-screen`}
      >
        {children}
      </div>

      <Footer />
    </main>
  );
};

export default PageModule;
