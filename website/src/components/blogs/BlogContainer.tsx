import { Blog } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const BlogContainer = () => {
  const [blogs, setBlogs] = useState<null | Blog[]>(null);

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
      .get("/api/blog")
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  function extractContent(s: string) {
    var span = document.createElement("span");
    span.innerHTML = s;
    return span.textContent || span.innerText;
  }

  return (
    <section className="w-full pt-36 sm:pt-28 pb-20 flex flex-col items-center justify-center px-4">
      <div className="bg-black w-full h-32 sm:h-20 absolute top-0 left-0" />

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
                  <p>
                    {extractContent(blog.text).length > 200
                      ? `${extractContent(blog.text).substring(0, 200)}...`
                      : extractContent(blog.text)}
                  </p>
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
    </section>
  );
};

export default BlogContainer;
