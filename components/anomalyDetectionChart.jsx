import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { IoReloadCircleSharp } from "react-icons/io5";
import { Button } from "./ui/button";

const API_KEYS = [
  { key: process.env.NEXT_ALPHA_VANTAGE_API_KEY, type: "alpha" },
  { key: process.env.NEXT_TWELVE_DATA_API_KEY, type: "twelvedata" },
  { key: process.env.NEXT_INTRINIO_API_KEY, type: "intrinio" },
  { key: process.env.NEXT_POLYGON_API_KEY, type: "polygon" },
];

const ANOMALY_THRESHOLD = 3; // Define a threshold for detecting anomalies

const getApiUrl = (stock, apiKeyObj) => {
  switch (apiKeyObj.type) {
    case "alpha":
      return `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stock}&interval=5min&apikey=${apiKeyObj.key}`;
    case "twelvedata":
      return `https://api.twelvedata.com/time_series?symbol=${stock}&interval=5min&apikey=${apiKeyObj.key}`;
    case "intrinio":
      return `https://api.intrinio.com/prices?identifier=${stock}&api_key=${apiKeyObj.key}`;
    case "polygon":
      return `https://api.polygon.io/v2/aggs/ticker/${stock}/range/5/minute/2024-03-28/2024-03-28?apiKey=${apiKeyObj.key}`;
    default:
      return null;
  }
};

export default function AnomalyDetectionChart({ selectedStock }) {
  const [chartData, setChartData] = useState(null);
  const [anomalies, setAnomalies] = useState([]);
  const [apiIndex, setApiIndex] = useState(0);

  useEffect(() => {
    if (!selectedStock) return;
    fetchStockData(selectedStock, apiIndex);
  }, [selectedStock, apiIndex]);

  const fetchStockData = async (stock, index) => {
    if (!API_KEYS[index]) {
      console.error("All API keys exhausted. Try again later.");
      return;
    }
  
    const apiKeyObj = API_KEYS[index];
    const apiUrl = getApiUrl(stock, apiKeyObj);
  
    if (!apiUrl) {
      setApiIndex((prevIndex) => prevIndex + 1);
      return;
    }
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const parsedData = parseResponseData(data, apiKeyObj.type);
  
      if (parsedData) {
        setChartData(parsedData);
      } else {
        console.warn(`API Key ${index} limit reached. Switching to next key...`);
        setApiIndex((prevIndex) => prevIndex + 1);
      }
    } catch (error) {
      console.error("Error fetching stock data:", error);
      setApiIndex((prevIndex) => prevIndex + 1);
    }
  };
  

  const parseResponseData = (data, type) => {
    let timeSeries;
    switch (type) {
      case "alpha":
        timeSeries = data["Time Series (5min)"];
        break;
      case "twelvedata":
        timeSeries = data["values"];
        break;
      case "intrinio":
        timeSeries = data["prices"];
        break;
      case "polygon":
        timeSeries = data["results"];
        break;
      default:
        return null;
    }

    if (!timeSeries) return null;

    const labels = Object.keys(timeSeries).slice(0, 20).reverse();
    const prices = labels.map((date) =>
      parseFloat(
        timeSeries[date]?.["4. close"] ||
          timeSeries[date]?.["close"] ||
          timeSeries[date]?.["c"] ||
          timeSeries[date]?.["last"]
      )
    );

    // Detect anomalies based on sudden price changes
    const detectedAnomalies = prices.map((price, index, arr) => {
      if (index > 0 && Math.abs(price - arr[index - 1]) > ANOMALY_THRESHOLD) {
        return { index, price };
      }
      return null;
    }).filter(Boolean);

    setAnomalies(detectedAnomalies);

    return {
      labels,
      datasets: [
        {
          label: "Stock Price ($)",
          data: prices,
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.5)",
          tension: 0.3,
        },
      ],
    };
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold mb-4"> 🚨 Anomaly Detection</h2>
        <Button variant="ghost" className="mr-2" onClick={() => fetchStockData(selectedStock, apiIndex)}>
          <IoReloadCircleSharp />
        </Button>
      </div>
      {chartData ? (
        <>
          <Line data={chartData} />
          {anomalies.length > 0 && (
            <div className="mt-4 p-2 bg-red-100 border-l-4 border-red-500 text-red-700">
              <h3 className="font-bold">Anomalies Detected:</h3>
              <ul>
                {anomalies.map((anomaly, idx) => (
                  <li key={idx}>
                    Significant change at index {anomaly.index}: ${anomaly.price.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      ) : (
        <p>Loading anomaly detection data...</p>
      )}
    </div>
  );
}
