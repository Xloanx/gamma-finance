import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const API_KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;
const STOCK_SYMBOL = "AAPL";
const ANOMALY_THRESHOLD = 3; // Define a threshold for detecting anomalies

export default function AnomalyDetectionChart() {
  const [chartData, setChartData] = useState(null);
  const [anomalies, setAnomalies] = useState([]);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${STOCK_SYMBOL}&interval=5min&apikey=${API_KEY}`
        );
        const data = await response.json();
        const timeSeries = data["Time Series (5min)"];

        if (timeSeries) {
          const labels = Object.keys(timeSeries).slice(0, 20).reverse();
          const prices = labels.map((date) => parseFloat(timeSeries[date]["4. close"]));
          
          // Detect anomalies based on sudden price changes
          const detectedAnomalies = prices.map((price, index, arr) => {
            if (index > 0 && Math.abs(price - arr[index - 1]) > ANOMALY_THRESHOLD) {
              return { index, price };
            }
            return null;
          }).filter(Boolean);
          
          setChartData({
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
          });
          setAnomalies(detectedAnomalies);
        }
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchStockData();
  }, []);

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white w-full">
      <h2 className="text-xl font-bold mb-4">Anomaly Detection</h2>
      {chartData ? (
        <>
          <Line data={chartData} />
          {anomalies.length > 0 && (
            <div className="mt-4 p-2 bg-red-100 border-l-4 border-red-500 text-red-700">
              <h3 className="font-bold">Anomalies Detected:</h3>
              <ul>
                {anomalies.map((anomaly, idx) => (
                  <li key={idx}>Significant change at index {anomaly.index}: ${anomaly.price.toFixed(2)}</li>
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
