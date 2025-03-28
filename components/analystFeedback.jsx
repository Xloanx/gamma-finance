import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function AnalystFeedback() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback Submitted:", { rating, feedback });
    setSubmitted(true);
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white w-full">
      <h2 className="text-xl font-bold mb-4">Analyst Feedback</h2>
      {submitted ? (
        <p className="text-green-600 font-bold">Thank you for your feedback!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-medium">Rate the Prediction:</label>
          <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, index) => {
              const starValue = index + 1;
              return (
                <FaStar
                  key={index}
                  className={`cursor-pointer text-2xl ${starValue <= (hover || rating) ? "text-yellow-500" : "text-gray-400"}`}
                  onClick={() => setRating(starValue)}
                  onMouseEnter={() => setHover(starValue)}
                  onMouseLeave={() => setHover(0)}
                />
              );
            })}
          </div>

          <label className="block mb-2 font-medium">Feedback:</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="border p-2 rounded w-full mb-4"
            rows="4"
            placeholder="Enter your feedback here..."
            required
          ></textarea>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit Feedback
          </button>
        </form>
      )}
    </div>
  );
}
