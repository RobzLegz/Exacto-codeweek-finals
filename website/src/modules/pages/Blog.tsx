import React, { useEffect, useRef, useState } from "react";
import PageModule from "../PageModule";
import BlogPage from "../../components/blogs/BlogPage";
import { Blog } from "@prisma/client";
import { NextPage } from "next";
import { useRouter } from "next/router";

interface Props {
  blog: Blog | null;
}

const Blog: NextPage<Props> = ({ blog: blogData }) => {
  const router = useRouter();

  const { title } = router.query;

  const [blog, setBlog] = useState<Blog | null>(blogData);

  const requestSent = useRef(false);

  const fetchB = async () => {
    const response = await fetch(`https://www.exacto.pro/api/blog/${title}`);
    const blogData = await response.json();

    setBlog(blogData);
  };

  useEffect(() => {
    if (!blog && !requestSent.current) {
      requestSent.current = true;
      fetchB();
    }
  }, []);

  if (!blog) {
    return (
      <PageModule title="Exacto Blog" description="Exacto blog">
        <p></p>
      </PageModule>
    );
  }

  return (
    <PageModule
      title={blog.title}
      description={markdownToPlainText(blog.text)}
      ogImage={blog.image}
      ogImageAlt={blog.title}
    >
      {blog && <BlogPage {...blog} />}
    </PageModule>
  );
};

export default Blog;

Blog.getInitialProps = async ({ req }) => {
  if (!req || !req.url) {
    return { blog: null };
  }

  const title = req.url.split("/").pop();

  const response = await fetch(`https://www.exacto.pro/api/blog/${title}`);
  const blogData = await response.json();
  return { blog: blogData };
};

function markdownToPlainText(markdown: string) {
  // Remove Markdown headings (lines starting with '#')
  markdown = markdown.replace(/^#\s+/gm, "");

  // Remove Markdown emphasis (e.g., '*', '_')
  markdown = markdown.replace(/[*_]/g, "");

  // Remove Markdown code blocks (between triple backticks '```')
  markdown = markdown.replace(/```[\s\S]*?```/g, "");

  // Remove Markdown inline code (e.g., '`code`')
  markdown = markdown.replace(/`([^`]+)`/g, "$1");

  // Remove Markdown links (e.g., '[text](url)')
  markdown = markdown.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

  // Remove Markdown images (e.g., '![alt](url)')
  markdown = markdown.replace(/!\[([^\]]+)\]\([^)]+\)/g, "");

  // Remove Markdown blockquotes (lines starting with '>')
  markdown = markdown.replace(/^>\s+/gm, "");

  // Remove Markdown lists (lines starting with '-', '+', or '1.')
  markdown = markdown.replace(/^[-+]\s+|\d+\.\s+/gm, "");

  // Remove extra newlines and trim
  markdown = markdown.replace(/\n+/g, "\n").trim();

  return markdown;
}
