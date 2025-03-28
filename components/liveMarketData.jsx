import React, { useEffect, useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;
const DEFAULT_STOCK = "AAPL"; // Default stock symbol (Apple)

export default function LiveMarketData() {
  const [marketData, setMarketData] = useState(null);
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
    const fetchMarketData = async () => {
      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${selectedStock}&apikey=${API_KEY}`
        );
        const data = await response.json();
        console.log(data);

        if (data["Global Quote"]) {
          setMarketData({
            symbol: data["Global Quote"]["01. symbol"],
            price: parseFloat(data["Global Quote"]["05. price"]),
            change: parseFloat(data["Global Quote"]["10. change percent"].replace("%", "")),
          });
        } else {
          setMarketData(null);
        }
      } catch (error) {
        console.error("Error fetching market data:", error);
      }
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 30000); // Fetch every 30 seconds
    return () => clearInterval(interval);
  }, [selectedStock]); // Refetch data when stock changes

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white w-full">
      <h2 className="text-xl font-bold mb-4">Live Market Data</h2>

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

      {/* Market Data Table */}
      {marketData ? (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b p-2">Stock</th>
              <th className="border-b p-2">Price</th>
              <th className="border-b p-2">Change</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2">{marketData.symbol}</td>
              <td className="p-2">${marketData.price.toFixed(2)}</td>
              <td className={`p-2 font-bold ${marketData.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                {marketData.change >= 0 ? "+" : ""}{marketData.change.toFixed(2)}%
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Loading market data...</p>
      )}
    </div>
  );
}
