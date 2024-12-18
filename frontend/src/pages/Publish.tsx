import axios from "axios";
import { Appbar } from "../components/Appbar";
import { BACKEND_URL } from "../config";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  // Function to handle post publish
  const publishPost = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        {
          title,
          content: description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Improved Authorization header
          },
        }
      );
      navigate(`/blog/${response.data.id}`);
    } catch (error) {
      console.error("Error publishing blog:", error);
    }
  };

  return (
    <div>
      <Appbar />
      <div className="flex justify-center w-full pt-8">
        <div className="max-w-screen-lg w-full">
          {/* Title Input */}
          <input
            type="text"
            placeholder="Your Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {/* Text Editor */}
          <TextEditor onChange={(e) => setDescription(e.target.value)} />
          {/* Publish Button */}
          <button
            onClick={publishPost}
            type="button"
            className="mt-4 inline-flex items-center px-3 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
          >
            Publish post
          </button>
        </div>
      </div>
    </div>
  );
};

interface TextEditorProps {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

function TextEditor({ onChange }: TextEditorProps) {
  return (
    <div className="mt-8">
      <div className="w-full mb-4">
        <div className="flex items-center justify-between px-3 py-2 border">
          <div className="my-2 bg-white rounded-b-lg w-full">
            <label className="sr-only">Publish post</label>
            <textarea
              onChange={onChange}
              id="editor"
              rows={8}
              className="block w-full px-0 text-sm focus-outline-none text-gray-800 bg-white border-0"
              placeholder="Write a blog..."
              required
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
