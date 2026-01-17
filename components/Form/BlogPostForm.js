"use client";
import React, { useState } from "react";
import axios from "axios";

const BlogPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/posts",
        { title, content },
        {
          withCredentials: true, // Include cookies for authentication
        }
      );
      setStatus("Post created successfully!");
      setTitle("");
      setContent("");
    } catch (error) {
      setStatus("Failed to create post.");
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="bg-white p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Create a New Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border rounded p-2"
            rows="4"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
      {status && <p className="mt-2">{status}</p>}
    </div>
  );
};

export default BlogPostForm;
