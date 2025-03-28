import React, { useEffect, useState } from "react";

const DEFAULT_STOCK = "AAPL"; // Default stock symbol (Apple)

export default function MarketInsights() {
  const [stockInsights, setStockInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStock, setSelectedStock] = useState(DEFAULT_STOCK);

  const stockOptions = [
    { symbol: "AAPL", name: "Apple" },
    { symbol: "GOOGL", name: "Alphabet (Google)" },
    { symbol: "TSLA", name: "Tesla" },
    { symbol: "AMZN", name: "Amazon" },
    { symbol: "MSFT", name: "Microsoft" },
    { symbol: "NVDA", name: "NVIDIA" },
  ];

  useEffect(() => {
    const fetchMarketInsights = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          // `https://api.allorigins.win/raw?url=http://gamma-fin-agent-734911192367.us-west1.run.app/analyze`,
          `https://gamma-fin-agent-734911192367.us-west1.run.app/analyze`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: selectedStock }),
            // mode: "no-cors",  // Ensures CORS mode is explicitly enabled
            redirect: "follow", // Avoids preflight issues with redirects
          }
        );
        console.log(response)
        const data = await response.json();
        console.log(data)
        if (data) {
          setStockInsights(data);
        } else {
          throw new Error("Invalid response from API");
        }
      } catch (error) {
        console.error("Error fetching market data:", error);
        setError(error.message || "Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchMarketInsights();
    // Optional polling (uncomment to enable periodic updates)
    // const interval = setInterval(fetchMarketInsights, 30000);
    // return () => clearInterval(interval);
  }, [selectedStock]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Market Insights & Trends</h2>

      {/* Stock Selector */}
      <div className="mb-4">
        <label htmlFor="stock-select" className="block font-semibold mb-2">
          Select Stock:
        </label>
        <select
          id="stock-select"
          className="border rounded px-3 py-2 w-full"
          value={selectedStock}
          onChange={(e) => setSelectedStock(e.target.value)}
        >
          {stockOptions.map((stock) => (
            <option key={stock.symbol} value={stock.symbol}>
              {stock.name} ({stock.symbol})
            </option>
          ))}
        </select>
      </div>

      {/* Data Display */}
      {loading ? (
        <p className="text-center text-gray-500">Fetching market insights...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div>
          <h3 className="text-lg font-semibold text-blue-600">Generated Insights</h3>
          <pre className="p-4 bg-gray-100 rounded-lg text-sm">
            {JSON.stringify(stockInsights, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
