import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <section className="w-full h-screen sm:h-[70vh] z-[2] overflow-hidden py-20">
      <Image
        src="/images/hero.jpg"
        width={2000}
        height={1000}
        alt="Space explosion"
        className="w-full object-cover absolute h-screen sm:h-[70vh] top-0 left-0"
      />

      <div className="z-[1] absolute h-screen sm:h-[70vh] top-0 left-0 bg-gradient-to-b from-transparent via-black/50 to-black w-full flex flex-col items-center justify-center" />

      <div className="z-[2] flex flex-col items-start justify-center w-full h-full px-4">
        <h1 className="text-white text-5xl sm:text-6xl xl:text-8xl z-[2] text-center">
          Exacto<span className="text-accent opacity-80">.</span>
        </h1>

        <h2 className="text-gray-100 text-2xl sm:text-3xl xl:text-4xl z-[2] mt-2 xl:mt-10 text-left">
          Our project aims to popularize the exact sciences among teenagers and
          encourage them to pursue careers in these fields.
        </h2>

        <p className="text-gray-200 text-lg sm:text-xl z-[2] mt-6 xl:mt-10 text-left">
          We believe that by making science more accessible and engaging, we can
          inspire the next generation of scientists and innovators.
        </p>

        <p className="text-gray-200 text-lg sm:text-xl z-[2] mt-2 xl:mt-4 text-left">
          Through a variety of initiatives and activities, we will provide
          teenagers with the resources and support they need to explore and
          learn about the exact sciences.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
