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
          {blogs.map((blog: any) => {
            // Format the date
            const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            });
  
            return (
              <BlogCard
                key={blog.id} // Unique key
                id={blog.id}
                authorname={blog.author.name || "Muni Kiran"} // Fallback if no author name is available
                title={blog.title}
                content={blog.content}
                publishedDate={formattedDate} // Use formatted createdAt date
              />
            );
          })}
        </div>
      </div>
    </div>
  );
  
};
