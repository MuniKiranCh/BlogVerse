import BlogCard from "../components/BlogCard"

const Blogs = () => {
  return (
    <div>
        <BlogCard 
            authorName="John Doe" 
            title="First Blog" 
            content="This is the content of the first blog" 
            publishedDate="December 18, 2024">
        </BlogCard>        
    </div>
  )
}

export default Blogs