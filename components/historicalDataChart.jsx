import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { IoReloadCircleSharp } from "react-icons/io5";
import { Button } from "./ui/button";

const API_KEYS = [
  { key: process.env.NEXT_ALPHA_VANTAGE_API_KEY, type: "alpha" },
  { key: process.env.NEXT_MARKETSTACK_API_KEY, type: "marketstack" },
  { key: process.env.NEXT_FINANCIAL_MODELING_PREP_KEY, type: "fmp" },
  { key: process.env.NEXT_TWELVE_DATA_API_KEY, type: "twelvedata" },
  { key: process.env.NEXT_INTRINIO_API_KEY, type: "intrinio" },
  { key: process.env.NEXT_POLYGON_API_KEY, type: "polygon" },
  { key: process.env.NEXT_TIINGO_API_KEY, type: "tiingo" },
];

const getApiUrl = (stock, apiKeyObj) => {
  switch (apiKeyObj.type) {
    case "alpha":
      return `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&apikey=${apiKeyObj.key}`;
    case "marketstack":
      return `https://api.marketstack.com/v1/eod?access_key=${apiKeyObj.key}&symbols=${stock}`;
    case "fmp":
      return `https://financialmodelingprep.com/api/v3/historical-price-full/${stock}?apikey=${apiKeyObj.key}`;
    case "twelvedata":
      return `https://api.twelvedata.com/time_series?symbol=${stock}&interval=1day&apikey=${apiKeyObj.key}`;
    case "intrinio":
      return `https://api.intrinio.com/prices?identifier=${stock}&api_key=${apiKeyObj.key}`;
    case "polygon":
      return `https://api.polygon.io/v2/aggs/ticker/${stock}/prev?apiKey=${apiKeyObj.key}`;
    case "tiingo":
      return `https://api.tiingo.com/tiingo/daily/${stock}/prices?token=${apiKeyObj.key}`;
    default:
      return null;
  }
};

const parseResponseData = (data, type) => {
  let timeSeries;

  switch (type) {
    case "alpha":
      timeSeries = data["Time Series (Daily)"];
      break;
    case "marketstack":
      timeSeries = data["data"];
      break;
    case "fmp":
      timeSeries = data["historical"];
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
    case "tiingo":
      timeSeries = data;
      break;
    default:
      return null;
  }

  if (!timeSeries) return null;

  const labels = Object.keys(timeSeries)
    .slice(0, 10)
    .reverse();
  const prices = labels.map((date) =>
    parseFloat(
      timeSeries[date]?.["4. close"] ||
        timeSeries[date]?.["close"] ||
        timeSeries[date]?.["adjClose"] ||
        timeSeries[date]?.["c"] ||
        timeSeries[date]?.["last"]
    )
  );

  return {
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
  };
};

export default function HistoricalDataChart({ selectedStock }) {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiIndex, setApiIndex] = useState(0);

  const fetchHistoricalData = async (stock, index = 0) => {
    if (index >= API_KEYS.length) {
      setError("All API keys exhausted. Try again later.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    setChartData(null);

    const apiKeyObj = API_KEYS[index];
    const apiUrl = getApiUrl(stock, apiKeyObj);

    if (!apiUrl) {
      setApiIndex(index + 1); // Try the next API if no valid URL
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
        setApiIndex(index + 1);
      }
    } catch (err) {
      console.error("Error fetching historical data:", err);
      setApiIndex(index + 1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedStock) {
      fetchHistoricalData(selectedStock, apiIndex);
    }
  }, [selectedStock, apiIndex]);

  return (
    <div className="mt-4 bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold mb-4">📉 Historical Stock Trends</h2>
        <Button variant="ghost" className="mr-2" onClick={() => fetchHistoricalData(selectedStock, apiIndex)}>
          <IoReloadCircleSharp />
        </Button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">🔄 Loading chart...</p>
      ) : error ? (
        <p className="text-center text-red-500">❌ {error}</p>
      ) : chartData ? (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <Line data={chartData} />
        </div>
      ) : (
        <p className="text-center text-gray-500">
          📌 Select a stock to view historical trends.
        </p>
      )}
    </div>
  );
}
