import React from "react";
import PageModule from "../PageModule";
import BlogContainer from "../../components/blogs/BlogContainer";

const Blog = () => {
  return (
    <PageModule title="Exacto blog" description="Exacto blog">
      <BlogContainer />
    </PageModule>
  );
};

export default Blog;
