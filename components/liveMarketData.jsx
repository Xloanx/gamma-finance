import React, { useState, useEffect } from "react";

const API_KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;

export default function LiveMarketData({ selectedStock }) {
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedStock) {
      fetchMarketData(selectedStock);
    }
  }, [selectedStock]);

  const fetchMarketData = async (stock) => {
    setLoading(true);
    setError(null);
    setMarketData(null);

    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock}&apikey=${API_KEY}`
      );
      const data = await response.json();
      console.log(data)
      if (data["Global Quote"]) {
        setMarketData({
          symbol: data["Global Quote"]["01. symbol"],
          price: parseFloat(data["Global Quote"]["05. price"]),
          change: parseFloat(
            data["Global Quote"]["10. change percent"].replace("%", "")
          ),
        });
      } else {
        setError("No market data available.");
      }
    } catch (err) {
      setError("Error fetching market data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-4 p-6 border rounded-lg shadow-lg bg-white w-full">
      <h2 className="text-xl font-bold mb-4">📈 Live Market Data</h2>

      {/* Market Data Display */}
      {loading ? (
        <p className="text-center text-gray-500">🔄 Loading market data...</p>
      ) : error ? (
        <p className="text-center text-red-500">❌ {error}</p>
      ) : marketData ? (
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
              <td className="p-2 font-medium">{marketData.symbol}</td>
              <td className="p-2">${marketData.price.toFixed(2)}</td>
              <td
                className={`p-2 font-bold ${
                  marketData.change >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {marketData.change >= 0 ? "+" : ""}
                {marketData.change.toFixed(2)}%
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">📌 Select a stock to view data.</p>
      )}
    </div>
  );
}
