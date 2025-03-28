import React, { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function ReportGeneration() {
  const [reportData, setReportData] = useState([
    { category: "Stock Prediction", value: "AAPL will rise 2.3% in 7 days" },
    { category: "Market Trend", value: "Bullish movement detected in S&P 500" },
    { category: "Anomaly Detected", value: "Unusual drop in Tesla stock" },
  ]);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Financial Market Report", 14, 20);
    autoTable(doc, {
      startY: 30,
      head: [["Category", "Details"]],
      body: reportData.map((row) => [row.category, row.value]),
    });
    doc.save("Financial_Report.pdf");
  };

  const generateCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Category,Details", ...reportData.map((row) => `${row.category},${row.value}`)].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Financial_Report.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="my-4 p-4 border rounded-lg shadow-md bg-white w-full">
      <h2 className="text-xl font-bold mb-4">Report Generation</h2>
      <button
        onClick={generatePDF}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700"
      >
        Download PDF
      </button>
      <button
        onClick={generateCSV}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Download CSV
      </button>
    </div>
  );
}