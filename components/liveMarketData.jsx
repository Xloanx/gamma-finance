import React, { useState, useEffect } from "react";
import { IoReloadCircleSharp } from "react-icons/io5";
import { Button } from "./ui/button";
// MARKETSTACK_API_KEY
const API_KEYS = [
  { key: process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY, provider: "alphaVantage" },
  { key: process.env.NEXT_PUBLIC_MARKETSTACK_API_KEY, provider: "marketStack" },
  { key: process.env.NEXT_PUBLIC_FMP_API_KEY, provider: "fmp" },
  { key: process.env.NEXT_PUBLIC_TWELVE_DATA_API_KEY, provider: "twelveData" },
  { key: process.env.NEXT_PUBLIC_POLYGON_API_KEY, provider: "polygon" },
  { key: process.env.NEXT_PUBLIC_IEX_CLOUD_API_KEY, provider: "iexCloud" },
  { key: process.env.NEXT_PUBLIC_FINNHUB_API_KEY, provider: "finnhub" },
  { key: process.env.NEXT_PUBLIC_YAHOO_FINANCE_API_KEY, provider: "yahooFinance" }
];

export default function LiveMarketData({ selectedStock }) {
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedStock) {
      fetchMarketData(selectedStock);
    }
  }, [selectedStock]);

  const fetchMarketData = async (stock, attempt = 0) => {
    if (attempt >= API_KEYS.length) {
      setError("All APIs have reached their limits. Try again later.");
      setLoading(false);
      return;
    }

    const { key, provider } = API_KEYS[attempt];
    setLoading(true);
    setError(null);
    setMarketData(null);

    let url = "";

    switch (provider) {
      case "alphaVantage":
        url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock}&apikey=${key}`;
        break;
      case "marketStack":
        url = `https://api.marketstack.com/v1/eod?access_key=${key}&symbols=${stock}`;
        break;
      case "fmp":
        url = `https://financialmodelingprep.com/api/v3/quote-short/${stock}?apikey=${key}`;
        break;
      case "twelveData":
        url = `https://api.twelvedata.com/quote?symbol=${stock}&apikey=${key}`;
        break;
      case "polygon":
        url = `https://api.polygon.io/v2/aggs/ticker/${stock}/prev?apiKey=${key}`;
        break;
      case "iexCloud":
        url = `https://cloud.iexapis.com/stable/stock/${stock}/quote?token=${key}`;
        break;
      case "finnhub":
        url = `https://finnhub.io/api/v1/quote?symbol=${stock}&token=${key}`;
        break;
      default:
        setError("No valid API provider found.");
        setLoading(false);
        return;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.error || Object.keys(data).length === 0) {
        throw new Error("API limit reached or no data available");
      }

      const formattedData = formatMarketData(data, provider);
      if (!formattedData) throw new Error("Invalid data format");

      setMarketData(formattedData);
    } catch (err) {
      console.warn(`Error fetching from ${provider}. Trying next API...`);
      fetchMarketData(stock, attempt + 1);
    } finally {
      setLoading(false);
    }
  };

  const formatMarketData = (data, provider) => {
    switch (provider) {
      case "alphaVantage":
        return data["Global Quote"]
          ? {
              symbol: data["Global Quote"]["01. symbol"],
              price: parseFloat(data["Global Quote"]["05. price"]),
              change: parseFloat(data["Global Quote"]["10. change percent"].replace("%", "")),
            }
          : null;
      case "marketStack":
        return data.data?.length > 0
          ? {
              symbol: data.data[0].symbol,
              price: data.data[0].close,
              change: data.data[0].change_percent,
            }
          : null;
      case "fmp":
        return data.length > 0
          ? {
              symbol: data[0].symbol,
              price: data[0].price,
              change: null,
            }
          : null;
      case "twelveData":
        return data?.close
          ? {
              symbol: data.symbol,
              price: data.close,
              change: data.percent_change,
            }
          : null;
      case "polygon":
        return data?.results?.length > 0
          ? {
              symbol: stock,
              price: data.results[0].c,
              change: null,
            }
          : null;
      case "iexCloud":
        return data?.latestPrice
          ? {
              symbol: data.symbol,
              price: data.latestPrice,
              change: data.changePercent * 100,
            }
          : null;
      case "finnhub":
        return data?.c
          ? {
              symbol: stock,
              price: data.c,
              change: data.dp,
            }
          : null;
      default:
        return null;
    }
  };

  return (
    <div className="my-4 p-6 border rounded-lg shadow-lg bg-white w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold mb-4">📈 Live Market Data</h2>
        <Button variant="ghost" className="mr-2" onClick={() => fetchMarketData(selectedStock)}>
          <IoReloadCircleSharp />
        </Button>
      </div>
      
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
              <td className={`p-2 font-bold ${marketData.change >= 0 ? "text-green-500" : "text-red-500"}`}>{marketData.change}%</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">📌 Select a stock to view data.</p>
      )}
    </div>
  );
}
