import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaFilePdf } from "react-icons/fa6";
import { IoReloadCircleSharp } from "react-icons/io5";
import { Button } from "./ui/button";
export default function MarketInsights({ selectedStock }) {
  const [stockInsights, setStockInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [report, setReport] = useState(null);

  useEffect(() => {
    if (selectedStock) {
      fetchMarketInsights(selectedStock);
    }
  }, [selectedStock]);

  const fetchMarketInsights = async (stock) => {
    setLoading(true);
    setError(null);
    setStockInsights(null);
    setReport(null);

    try {
      const response = await axios.post(
                                "/api/analyze", 
                                { query: stock }
                              );
      setStockInsights(response.data.insights || "No insights available.");
      setReport(response.data.pdf_report || null);
    } catch (error) {
      console.error("Error fetching market data:", error);
      setError(error.response?.data?.message || "Failed to load data.");
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="bg-white p-6 border rounded-lg shadow-lg w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">📊 Market Insights & Trends</h2>
        <Button variant="ghost" className="mr-2" onClick={() => fetchMarketInsights(selectedStock)}>
          <IoReloadCircleSharp />
        </Button>
      </div>
      {loading ? (
        <p className="text-center text-gray-500">🔄 Fetching market insights...</p>
      ) : error ? (
        <p className="text-center text-red-500">❌ {error}</p>
      ) : stockInsights ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-blue-700 mb-3">📈 Market Insights</h3>
          <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="text-gray-800 text-sm leading-relaxed">
              {stockInsights.split("\n").map((line, index) => (
                <p key={index} className="mb-2">{line}</p>
              ))}
            </div>
          </div>

          {report && (
            <a
              href={report}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              <FaFilePdf className="mr-2" /> Download Report
            </a>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500">📌 Select a stock to get insights.</p>
      )}
    </div>
  );
}
