import { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const featuredStocks = ["NVDA", "TSLA", "GOOG", "AAPL", "MSFT"];

export default function MarketInsights() {
  const [stockTrends, setStockTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated API Call (Replace with real API later)
    const mockData = featuredStocks.map((symbol) => ({
      symbol,
      priceChange: (Math.random() * 5 - 2).toFixed(2), // Random price change (-2% to 5%)
      volume: Math.floor(Math.random() * 1000000) + 500000, // Random volume
    }));

    setStockTrends(mockData);
    setLoading(false);
  }, []);

  if (loading) return <p className="text-center text-gray-500">Fetching market insights...</p>;

  // Prepare Chart Data
  const lineChartData = {
    labels: stockTrends.map((stock) => stock.symbol),
    datasets: [
      {
        label: "Price Change (%)",
        data: stockTrends.map((stock) => parseFloat(stock.priceChange)),
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
      },
    ],
  };

  const barChartData = {
    labels: stockTrends.map((stock) => stock.symbol),
    datasets: [
      {
        label: "Trading Volume",
        data: stockTrends.map((stock) => stock.volume),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Market Insights & Trends</h2>

      {/* Line Chart for Price Change */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-blue-600">Stock Price Changes</h3>
        <Line data={lineChartData} />
      </div>

      {/* Bar Chart for Trading Volume */}
      <div>
        <h3 className="text-lg font-semibold text-green-600">Trading Volume</h3>
        <Bar data={barChartData} />
      </div>
    </div>
  );
}
