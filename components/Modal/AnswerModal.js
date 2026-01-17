"use client";
import React, { useState } from "react";

const AnswerModal = ({ question }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/questions/${question._id}/answers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: answer }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit answer");
      }

      const newAnswer = await response.json();
      console.log("Answer submitted:", newAnswer);
      setAnswer("");
      setIsOpen(false); // মডাল বন্ধ করুন
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        উত্তর দিন
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">প্রশ্ন: {question.title}</h2>
            <form onSubmit={handleSubmit}>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                rows="4"
                placeholder="আপনার উত্তর লিখুন..."
                required
              />
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="mr-2 px-4 py-2 border border-gray-300 rounded"
                >
                  বাতিল করুন
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  জমা দিন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AnswerModal;
