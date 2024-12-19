import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

// Blog interface
export interface Blog {
  content: string;
  title: string;
  id: number;
  author: {
    name: string;
  };
  createdAt: string;
}

// Hook to fetch a single blog
export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: {
            Authorization: "Bearer "+localStorage.getItem("token") || "",
          },
        });
        setBlog(response.data.blog);
        setLoading(false);
      } catch (err: any) {
        setError("Failed to fetch blog");
        setLoading(false);
      }
    };

    fetchBlog();

    // Cleanup to prevent state update if component is unmounted
    return () => {
      setLoading(true);
      setError(null);
      setBlog(null);
    };
  }, [id]); // Only re-run the effect when the `id` changes

  return {
    loading,
    blog,
    error,
  };
};

// Hook to fetch multiple blogs
export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);

  // console.log(localStorage.getItem("token"));

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // console.log(localStorage.getItem("token"));

        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
          headers: {
            Authorization: "Bearer "+localStorage.getItem("token") || "",
          },
        });
        setBlogs(response.data.blogs);
        setLoading(false);
      } catch (err: any) {
        setError("Failed to fetch blogs");
        setLoading(false);
      }
    };

    fetchBlogs();

    // Cleanup on unmount
    return () => {
      setLoading(true);
      setError(null);
      setBlogs([]);
    };
  }, []); // Only run this once when the component mounts

  return {
    loading,
    blogs,
    error,
  };
};
