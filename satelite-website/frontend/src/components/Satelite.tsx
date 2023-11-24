import Image from "next/image";
import React from "react";

const Satelite = () => {
  return (
    <section
      className="w-full flex flex-col items-center justify-center md:flex-row z-10 bg-black/70 py-10 pb-20 gap-6 md:gap-8 px-4"
      id="learn-more"
    >
      <div className="flex flex-col items-center justify-center md:items-start md:justify-start">
        <strong className="text-white text-3xl max-w-[500px] leading-[45px] text-center md:text-left">
          Powerful nano satelite + launch for 20'000€
        </strong>
      </div>

      <Image
        src="/resources/satelite.jpg"
        alt="LatSat"
        width={400}
        height={700}
        className="w-full max-w-[300px] h-[400px] object-cover rounded-lg"
      />
    </section>
  );
};

export default Satelite;
