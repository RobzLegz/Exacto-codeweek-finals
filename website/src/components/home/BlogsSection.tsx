import { Blog } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const BlogsSection = () => {
  const [blogs, setBlogs] = useState<Blog[] | null>(null);

  const requestSent = useRef(false);

  useEffect(() => {
    if (blogs || requestSent.current) {
      return;
    }

    requestSent.current = true;

    getBlogsFunc();
  }, []);

  const getBlogsFunc = async () => {
    await axios
      .get("/api/blog?take=3")
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <section className="w-full py-10 flex flex-col items-center justify-center px-4">
      <strong className="text-black text-4xl">Our Blog</strong>

      {blogs ? (
        <div className="blog_container">
          {blogs.map((blog, i) => (
            <Link href={`/blog/${blog.url}`} key={i}>
              <div className="blog_item">
                {blog.image ? (
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    width={500}
                    height={300}
                    className="object-cover w-full h-60 rounded-sm"
                  />
                ) : (
                  <div className="w-full h-60 rounded-sm bg-gray-100" />
                )}

                <div className="p-4 flex flex-col items-start justify-start">
                  <strong>{blog.title}</strong>
                  <div className="h-20 overflow-hidden w-full relative">
                    <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-b from-transparent to-gray-50" />
                    <span dangerouslySetInnerHTML={{ __html: blog.text }} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="blog_container">
          {Array.from({ length: 3 }, (_, i) => i).map((_, i) => (
            <div className="blog_item" key={i}>
              <div className="w-full h-60 rounded-sm bg-gray-100" />

              <div className="p-4 flex flex-col items-start justify-start w-full">
                <div className="bg-gray-200 w-full max-w-[200px] h-6" />
                <div className="bg-gray-200 w-full max-w-[240px] h-3 mt-2" />
              </div>
            </div>
          ))}
        </div>
      )}

      <Link
        href="/blog"
        className="w-full max-w-[200px] py-2 border-accent border-2 text-center mt-8 text-lg"
      >
        See more
      </Link>
    </section>
  );
};

export default BlogsSection;
