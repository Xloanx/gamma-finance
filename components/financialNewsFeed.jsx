import React, { useEffect, useState } from "react";
import { IoReloadCircleSharp } from "react-icons/io5";
import { Button } from "./ui/button";

const API_KEYS = [
  { key: process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY, type: "alpha" },
  { key: process.env.NEXT_PUBLIC_TWELVE_DATA_API_KEY, type: "twelvedata" },
  // { key: process.env.NEXT_PUBLIC_INTRINIO_API_KEY, type: "intrinio" },
  { key: process.env.NEXT_PUBLIC_POLYGON_API_KEY, type: "polygon" },
];

const NEWS_CATEGORY = "financial_markets";

export default function FinancialNewsFeed() {
  const [news, setNews] = useState([]);
  const [apiIndex, setApiIndex] = useState(0);

  const getNewsApiUrl = (apiKeyObj) => {
    switch (apiKeyObj.type) {
      case "alpha":
        return `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=${NEWS_CATEGORY}&apikey=${apiKeyObj.key}`;
      case "twelvedata":
        return `https://api.twelvedata.com/news?symbol=AAPL&apikey=${apiKeyObj.key}`;
      case "intrinio":
        return `https://api.intrinio.com/news?api_key=${apiKeyObj.key}`;
      case "polygon":
        return `https://api.polygon.io/v2/reference/news?apiKey=${apiKeyObj.key}`;
      default:
        return null;
    }
  };

  const fetchNews = async (index = 0) => {
    if (index >= API_KEYS.length) {
      console.error("All API keys exhausted. Try again later.");
      return;
    }

    const apiKeyObj = API_KEYS[index];
    const apiUrl = getNewsApiUrl(apiKeyObj);

    if (!apiUrl) {
      setApiIndex(index + 1);
      fetchNews(index + 1);
      return;
    }

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const parsedData = parseNewsResponse(data, apiKeyObj.type);

      if (parsedData.length > 0) {
        setNews(parsedData);
      } else {
        console.warn(`API Key ${index} limit reached. Switching to next key...`);
        setApiIndex(index + 1);
        fetchNews(index + 1);
      }
    } catch (error) {
      console.error("Error fetching financial news:", error);
      setApiIndex(index + 1);
      fetchNews(index + 1);
    }
  };

  const parseNewsResponse = (data, type) => {
    switch (type) {
      case "alpha":
        return data.feed ? data.feed.slice(0, 20) : [];
      case "twelvedata":
        return data.data ? data.data.slice(0, 20) : [];
      case "intrinio":
        return data.news ? data.news.slice(0, 20) : [];
      case "polygon":
        return data.results ? data.results.slice(0, 20) : [];
      default:
        return [];
    }
  };

  useEffect(() => {
    fetchNews(apiIndex);
    const interval = setInterval(() => fetchNews(apiIndex), 120000); // Refresh every 2 minutes
    return () => clearInterval(interval);
  }, [apiIndex]);

  return (
    <div className="my-4 p-4 border rounded-lg shadow-md bg-white w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold mb-4">📰 Latest Financial News</h2>
        <Button variant="ghost" className="mr-2" onClick={() => fetchNews(apiIndex)}>
          <IoReloadCircleSharp />
        </Button>
      </div>
      <ul className="space-y-3">
        {news.length > 0 ? (
          news?.map((item, index) => {
            const formattedDate = new Date(
              item.time_published?.replace(
                /(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/,
                "$1-$2-$3T$4:$5:$6"
              ) || item.published_utc || item.date || ""
            ).toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              timeZoneName: "short",
            });

            return (
              <li key={index} className="p-2 border-b">
                <a
                  href={item.url || item.article_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {item.title}
                </a>
                <p className="text-sm text-gray-600">
                  {item.source || item.publisher} - {formattedDate}
                </p>
              </li>
            );
          })
        ) : (
          <p>Loading financial news...</p>
        )}
      </ul>
    </div>
  );
}
