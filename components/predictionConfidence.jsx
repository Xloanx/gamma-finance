import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const API_KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;
const STOCK_SYMBOL = "AAPL";

export default function PredictionConfidence() {
  const [confidence, setConfidence] = useState(null);

  useEffect(() => {
    const fetchPredictionConfidence = async () => {
      try {
        // Placeholder API request (replace with actual AI confidence score retrieval)
        const response = await fetch(
          `https://api.example.com/predict-confidence?symbol=${STOCK_SYMBOL}&apikey=${API_KEY}`
        );
        const data = await response.json();
        if (data.confidence_score) {
          setConfidence(data.confidence_score);
        }
      } catch (error) {
        console.error("Error fetching confidence score:", error);
      }
    };

    fetchPredictionConfidence();
  }, []);

  return (
    <div className="my-4 p-4 border rounded-lg shadow-md bg-white w-full flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Prediction Confidence</h2>
      {confidence !== null ? (
        <div className="w-32 h-32">
          <CircularProgressbar
            value={confidence}
            text={`${confidence}%`}
            styles={buildStyles({
              textColor: "#000",
              pathColor: confidence > 70 ? "#10B981" : confidence > 40 ? "#FBBF24" : "#EF4444",
              trailColor: "#D1D5DB",
            })}
          />
        </div>
      ) : (
        <p>Loading confidence score...</p>
      )}
    </div>
  );
}
