import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar />

      <div className="flex justify-center">
        <div className="grid grid-cols-12 w-full px-10 pt-20 max-w-screen-xl">
          {/* Blog Content */}
          <div className="col-span-8">
            <div className="text-3xl font-extrabold">{blog.title}</div>
            <div className="text-slate-500 pt-3">Posted on 23rd June 2023</div>
            <div className="pt-4">{blog.content}</div>
          </div>

          {/* Author Information */}
          <div className="col-span-4">
            <div className="text-slate-600 text-lg">Author</div>

            <div className="flex mt-4">
              <div className="pr-4 flex flex-col justify-center">
                <Avatar size={"small"} name={blog.author.name || "Anonymous"} />
              </div>
              <div>
                <div className="text-xl font-bold">
                  {blog.author.name || "Anonymous"}
                </div>
                <div className="pt-2 text-slate-500">
                  Random catchphrase about the author's ability to grab the user's
                  attention.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};