import Image from "next/image";
import Link from "next/link";
import React from "react";

const Links = () => {
  return (
    <section className="flex items-center justify-center gap-4 p-6 z-10 bg-black/70 w-full">
      <Link
        href="https://github.com/RobzLegz/jenoti"
        target="_blank"
        rel="noreferer"
      >
        <Image
          src="/resources/github.png"
          alt="github logo"
          width={80}
          height={80}
          className="w-12 h-12"
        />
      </Link>
    </section>
  );
};

export default Links;
