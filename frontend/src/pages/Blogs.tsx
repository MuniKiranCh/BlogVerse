import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="flex justify-center">
          <div>
            {/* Rendering multiple BlogSkeleton components */}
            {[...Array(8)].map((_, index) => (
              <BlogSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div>
          {/* Rendering the BlogCard for each blog */}
          {blogs.map((blog: any) => (
            <BlogCard
              key={blog.id} // It's important to add a unique key to each list item
              id={blog.id}
              authorname={blog.author.name || "Jaser"} // Fallback if no author name is available
              title={blog.title}
              content={blog.content}
              publishedDate={"23rd June"} // You can replace this with actual published date from the API
            />
          ))}
        </div>
      </div>
    </div>
  );
};
