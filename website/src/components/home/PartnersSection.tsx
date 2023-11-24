import Image from "next/image";
import Link from "next/link";
import React from "react";

const PartnersSection = () => {
  return (
    <section className="w-full py-10 flex flex-col items-center justify-center">
      <strong className="text-black text-4xl">Partners</strong>

      <div className="grid grid-cols-1 sm:grid-cols-3 mt-10 w-full gap-6 sm:gap-4">
        <Link
          href="https://spotloc.lv"
          target="_blank"
          rel="noreferer"
          className="w-full items-center justify-center flex"
        >
          <Image
            src="/logo/spotloc.svg"
            alt="Spotloc logo"
            className="object-contain"
            width={160}
            height={80}
          />
        </Link>

        {/* <Link href="/" className="w-full items-center justify-center flex">
          <Image
            src="/logo.png"
            alt="Exacto logo"
            className="object-contain rounded-lg"
            width={80}
            height={80}
          />
        </Link> */}

        <Link
          href="https://www.lu.lv"
          target="_blank"
          rel="noreferer"
          className="w-full items-center justify-center flex"
        >
          <Image
            src="/logo/latvijas-universitate.png"
            alt="Latvijas Universitātes logo"
            className="object-contain rounded-lg"
            width={160}
            height={200}
          />
        </Link>

        <Link
          href="https://jalatvia.lv"
          target="_blank"
          rel="noreferer"
          className="w-full items-center justify-center flex"
        >
          <Image
            src="/logo/ja-latvia.png"
            alt="Junior Achievement Latvia logo"
            className="object-contain"
            width={160}
            height={80}
          />
        </Link>
      </div>
    </section>
  );
};

export default PartnersSection;
