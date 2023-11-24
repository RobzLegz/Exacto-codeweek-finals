import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Navigation = () => {
  const router = useRouter();

  if (router.asPath.includes("lab")) {
    return (
      <nav className="w-full absolute top-0 left-0 flex flex-col gap-4 sm:gap-0 sm:flex-row items-center justify-between z-10 py-4 px-8 bg-black">
        <Link href="/">
          <strong className="text-white text-4xl z-[2] text-center">
            Exacto Lab<span className="text-accent opacity-80">.</span>
          </strong>
        </Link>

        <ul className="flex items-center justify-end gap-6 text-white text-lg">
          <li>
            <Link href="/">Home</Link>
          </li>

          <li>
            <Link href="/blog">Blog</Link>
          </li>

          <li>
            <Link href="/lab">Lab</Link>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <nav className="w-full absolute top-0 left-0 flex flex-col gap-4 sm:gap-0 sm:flex-row items-center justify-between z-10 py-4 px-8">
      <Link href="/">
        <strong className="text-white text-4xl z-[2] text-center">
          Exacto<span className="text-accent opacity-80">.</span>
        </strong>
      </Link>

      <ul className="flex items-center justify-end gap-6 text-white text-lg">
        <li>
          <Link href="/">Home</Link>
        </li>

        <li>
          <Link href="/blog">Blog</Link>
        </li>

        <li className="hidden sm:block">
          <Link href="/#events">Events</Link>
        </li>

        <li>
          <Link href="/#contacts">Contacts</Link>
        </li>

        <li>
          <Link href="/lab">Lab</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
