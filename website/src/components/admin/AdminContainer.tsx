import { Blog } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

const AdminContainer = () => {
  const [currentBlog, setCurrentBlog] = useState<null | Blog>(null);
  const [blogs, setBlogs] = useState<null | Blog[]>(null);
  const [open, setOpen] = useState(false);

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

  return (
    <div className="w-full min-h-screen pt-32 sm:pt-28">
      <div className="bg-black w-full h-32 sm:h-20 absolute top-0 left-0" />
      <div className="blog-list p-4">
        <h2 className="text-3xl font-semibold">Blog List</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {blogs &&
            blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-start justify-between w-full"
              >
                <div className="w-full">
                  {blog.image && (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-32 object-cover"
                    />
                  )}

                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{blog.title}</h3>
                  </div>
                </div>

                <div className="p-4 flex gap-2">
                  <button
                    onClick={() => {
                      setOpen(true);
                      setCurrentBlog(blog);
                    }}
                    className="mt-2 px-4 py-2 w-auto bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Edit
                  </button>

                  <button
                    onClick={async () => {
                      var result = confirm("Want to delete?");
                      if (result) {
                        await axios
                          .delete(`/api/blog/${blog.id}`)
                          .then((res) => {
                            setBlogs(blogs.filter((bl) => bl.id !== blog.id));
                          });
                      }
                    }}
                    className="mt-2 px-4 py-2 w-auto bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      <button
        className="w-16 h-16 rounded-full bg-indigo-600 shadow-xl absolute right-4 bottom-4"
        onClick={() => {
          setOpen(true);
          setCurrentBlog(null);
          document.body.style.overflow = "hidden";
        }}
      >
        NEW
      </button>

      {open && (
        <NewBlogContainer
          currentBlog={currentBlog}
          close={() => {
            setOpen(false);
            setCurrentBlog(null);
            document.body.style.overflow = "auto";
          }}
          blogs={blogs}
          setBlogs={setBlogs}
        />
      )}
    </div>
  );
};

export default AdminContainer;

const NewBlogContainer: React.FC<{
  currentBlog: Blog | null;
  close: () => void;
  blogs: Blog[];
  setBlogs: React.Dispatch<React.SetStateAction<Blog[]>>;
}> = ({ currentBlog, close, blogs, setBlogs }) => {
  const [title, setTitle] = useState(currentBlog ? currentBlog.title : "");
  const [content, setContent] = useState(currentBlog ? currentBlog.text : "");
  const [image, setImage] = useState(currentBlog ? currentBlog.image : "");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (currentBlog?.id) {
        await axios
          .put(
            `/api/blog/${currentBlog.id}`,
            { title, text: content, image },
            { withCredentials: true }
          )
          .then((res) => {
            setBlogs(
              blogs.map((blog) => {
                if (blog.id !== res.data.id) {
                  return blog;
                }

                return res.data;
              })
            );
          });

        close();

        return;
      }

      await axios
        .post("/api/blog", { title, text: content, image })
        .then((res) => {
          setBlogs([...blogs, res.data]);
        });
      close();
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="w-full h-full absolute top-0 left-0 bg-black/50 z-30 flex items-start justify-center py-24 overflow-y-auto">
      <form
        className="w-full max-w-[1200px] bg-white rounded-lg border-2 p-10"
        onSubmit={handleSave}
      >
        <h2 className="text-2xl font-bold mb-4">Create New Blog</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="w-full p-2 border rounded-md mb-2"
          required
        />
        <input
          type="url"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full p-2 border rounded-md mb-2"
        />
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          className="h-64"
        />
        <div className="flex justify-end mt-14">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Save
          </button>
          <button
            onClick={close}
            type="button"
            className="ml-2 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
