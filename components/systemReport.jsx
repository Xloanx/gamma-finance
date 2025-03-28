'use client';
import React, { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FaFilePdf } from "react-icons/fa6";
import { FaFileCsv } from "react-icons/fa6";

const SystemReport = () => {
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
        <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">System Report</h2>
                <div>
                <button
                    onClick={generatePDF}
                    // className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700"
                    className="px-4 py-2 rounded mr-2"
                >
                    <FaFilePdf />
                </button>
                <button
                    onClick={generateCSV}
                    // className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                    className=" px-4 py-2 rounded"
                >
                    <FaFileCsv />
                </button>
                </div>
            </div>
            <p>Here you can view the latest system reports and analysis.</p>
        </div>
    );
}

export default SystemReport;
