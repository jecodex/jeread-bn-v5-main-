"use client";
import { useState } from "react";
import axios from "axios";

const CreateBook = ({ form, profileData }) => {
  console.log(profileData);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
    author: "",
    category: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/story", {
        ...formData,
        tags: formData.tags.split(",").map((tag) => tag.trim()),
      });

      setMessage("Blog post created successfully!");
      setFormData({
        title: "",
        content: "",
        tags: "",
        author: "",
        category: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create blog post.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-5 bg-gray-100 rounded shadow">
      <h1 className="text-2xl font-bold mb-5">Create a New Blog Post</h1>
      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Content:</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          ></textarea>
        </div>
        <div>
          <label className="block font-medium">Tags (comma-separated):</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Author:</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Blog Post
        </button>
      </form>
    </div>
  );
};

export default CreateBook;
