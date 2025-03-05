"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import FinancialAdviceForm from "@/components/financialAdviceForm";  // Renamed from FinancialAdviceModal
import SystemReport from "@/components/systemReport";
import MarketInsight from "@/components/marketInsight";
import { FaHome } from "react-icons/fa";

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeFeature, setActiveFeature] = useState("welcome"); // Controls what is displayed
    const router = useRouter();

  return (
    <div className="flex h-screen">
      {/* Sidebar Navigation */}
      <motion.aside
        className={`${
          sidebarOpen ? "w-1/5" : "w-16"
        } bg-gray-900 text-white p-6 flex flex-col transition-all duration-300 overflow-hidden`}
        initial={{ width: sidebarOpen ? "20%" : "4rem" }}
        animate={{ width: sidebarOpen ? "20%" : "4rem" }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className={`${sidebarOpen ? "text-2xl font-bold" : "hidden"}`}>Gamma Financial Advisor</h2>
          <Button
            variant="ghost"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        <nav className="flex flex-col gap-4">
            <Button 
            variant="ghost"
            className="mt-auto p-0 hover:bg-transparent focus:ring-0 focus:outline-none cursor-pointer"
            // onClick={() => setActiveFeature("welcome")}
            onClick={() => router.push("/")}
            >
            <FaHome className="text-white text-4xl hover:text-gray-300" />
            </Button>

          <Button className="bg-blue-500 hover:bg-blue-700" onClick={() => setActiveFeature("advice")}>
            {sidebarOpen ? "Ask for Financial Advice" : "Advice"}
          </Button>
          <Button className="bg-green-500 hover:bg-green-700" onClick={() => setActiveFeature("report")}>
            {sidebarOpen ? "View System Report" : "Report"}
          </Button>
          <Button className="bg-yellow-500 hover:bg-yellow-700" onClick={() => setActiveFeature("insight")}>
            {sidebarOpen ? "View Market Insights" : "Insights"}
          </Button>
        </nav>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-gray-100 p-10 overflow-y-auto">
        {/* Top Navbar */}
        <header className="flex justify-between items-center mb-6 bg-white shadow-lg p-4 rounded-lg">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button className="bg-red-500 hover:bg-red-700" onClick={() => alert("Logging out...")}>
            Logout
          </Button>
        </header>

        {/* Dynamic Main Content */}
        <motion.div className="text-lg bg-white p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
        >
          {activeFeature === "welcome" && (
            <p>Welcome to the AI Financial Advice System! Use the sidebar to navigate through the available features.</p>
          )}
          {activeFeature === "advice" && <FinancialAdviceForm />}
          {activeFeature === "report" && <SystemReport />}
          {activeFeature === "insight" && <MarketInsight />}
        </motion.div>
      </main>
    </div>
  );
}
