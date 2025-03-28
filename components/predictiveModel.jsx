import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

// Register required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function PredictiveModel() {
  const [predictions, setPredictions] = useState([
    { date: "Mar 25", price: 245.3 },
    { date: "Mar 26", price: 247.8 },
    { date: "Mar 27", price: 243.1 },
    { date: "Mar 28", price: 249.5 },
    { date: "Mar 29", price: 250.7 },
  ]);

  const data = {
    labels: predictions.map((p) => p.date),
    datasets: [
      {
        label: "Stock Price Prediction (Next 5 Days)",
        data: predictions.map((p) => p.price),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Stock Price Prediction</h2>
      <Line data={data} />
    </div>
  );
}
