import React, { useEffect, useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;
const STOCK_SYMBOL = "AAPL"; // Example stock symbol

export default function LiveMarketData() {
  const [marketData, setMarketData] = useState(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${STOCK_SYMBOL}&apikey=${API_KEY}`
        );
        const data = await response.json();
        console.log(data)
        if (data["Global Quote"]) {
          setMarketData({
            symbol: data["Global Quote"]["01. symbol"],
            price: parseFloat(data["Global Quote"]["05. price"]),
            change: parseFloat(data["Global Quote"]["10. change percent"].replace("%", "")),
          });
        }
      } catch (error) {
        console.error("Error fetching market data:", error);
      }
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 30000); // Fetch every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white w-full">
      <h2 className="text-xl font-bold mb-4">Live Market Data</h2>
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
