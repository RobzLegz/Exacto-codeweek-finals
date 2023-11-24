import { Blog } from "@prisma/client";
import Image from "next/image";
import React from "react";

const BlogPage: React.FC<Blog> = ({ ...props }) => {
  return (
    <section className="w-full pt-36 sm:pt-28 pb-20 flex flex-col items-center justify-center px-4">
      <div className="bg-black w-full h-32 sm:h-20 absolute top-0 left-0" />

      <h1 className="text-4xl">{props.title}</h1>

      <Image
        src={props.image}
        alt={props.title}
        width={600}
        height={400}
        className="w-full rounded-lg max-w-[600px] my-4"
      />

      <div
        dangerouslySetInnerHTML={{
          __html: props.text,
        }}
        className="md"
      />
    </section>
  );
};

export default BlogPage;
