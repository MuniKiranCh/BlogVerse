import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";

// Helper function to format the date as "23rd June 2023"
const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  };
  
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString('en-GB', options);

  // Add suffix to the day (e.g., "23rd", "1st", "2nd", "3rd", etc.)
  const day = dateObj.getDate();
  const daySuffix = ['st', 'nd', 'rd', 'th'][((day % 10) - 1) % 10] || 'th';
  
  return formattedDate.replace(/\d{1,2}/, day + daySuffix);
};

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar />

      <div className="flex justify-center">
        <div className="grid grid-cols-12 w-full px-10 pt-20 max-w-screen-xl">
          {/* Blog Content */}
          <div className="col-span-8">
            <div className="text-3xl font-extrabold">{blog.title}</div>
            <div className="text-slate-500 pt-3">
              {/* Format the createdAt date */}
              Posted on {formatDate(blog.createdAt)}
            </div>
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
                  Random catchphrase about the author's ability to grab the user's attention.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
