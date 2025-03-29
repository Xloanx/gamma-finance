import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const API_KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;
const STOCK_SYMBOL = "AAPL";

export default function HistoricalDataChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${STOCK_SYMBOL}&apikey=${API_KEY}`
        );
        const data = await response.json();
        const timeSeries = data["Time Series (Daily)"];
        
        if (timeSeries) {
          const labels = Object.keys(timeSeries).slice(0, 10).reverse();
          const prices = labels.map(date => parseFloat(timeSeries[date]["4. close"]));
          
          setChartData({
            labels,
            datasets: [
              {
                label: "Closing Price ($)",
                data: prices,
                borderColor: "#3b82f6",
                backgroundColor: "rgba(59, 130, 246, 0.5)",
                tension: 0.3,
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching historical data:", error);
      }
    };

    fetchHistoricalData();
  }, []);

  return (
    <div className="my-4 p-4 border rounded-lg shadow-md bg-white w-full">
      <h2 className="text-xl font-bold mb-4"> 📉 Historical Stock Trends</h2>
      {chartData ? <Line data={chartData} /> : <p>Loading chart...</p>}
    </div>
  );
}
