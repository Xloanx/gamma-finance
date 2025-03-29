import React, { useEffect, useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;
const NEWS_CATEGORY = "financial_markets"; // Example category

export default function FinancialNewsFeed() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=${NEWS_CATEGORY}&apikey=${API_KEY}`
        );
        const data = await response.json();
        if (data.feed) {
          setNews(data.feed.slice(0, 20)); // Limit to latest 20 news items
        }
      } catch (error) {
        console.error("Error fetching financial news:", error);
      }
    };

    fetchNews();
    const interval = setInterval(fetchNews, 120000); // Fetch every 60 seconds
    return () => clearInterval(interval);
  }, []);
console.log(news)
return (
  <div className="my-4 p-4 border rounded-lg shadow-md bg-white w-full">
    <h2 className="text-xl font-bold mb-4">📰 Latest Financial News</h2>
    <ul className="space-y-3">
      {news.length > 0 ? (
        news.map((item, index) => {
          // Convert item.time_published (e.g., "20250329T033800") to a readable date
          const formattedDate = new Date(
            item.time_published.replace(
              /(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/, 
              "$1-$2-$3T$4:$5:$6"
            )
          ).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZoneName: "short"
          });

          return (
            <li key={index} className="p-2 border-b">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {item.title}
              </a>
              <p className="text-sm text-gray-600">
                {item.source} - {formattedDate}
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
