"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import FinancialAdviceModal from "@/components/financialAdviceModal";
import SystemReportModal from "@/components/systemReportModal";

export default function Dashboard() {
  const [showAdviceModal, setShowAdviceModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
          <h2 className={`${sidebarOpen ? "text-2xl font-bold" : "hidden"}`}>AI Financial Advice</h2>
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
            className="bg-blue-500 hover:bg-blue-700"
            onClick={() => setShowAdviceModal(true)}
          >
            {sidebarOpen ? "Ask for Financial Advice" : "Advice"}
          </Button>
          <Button
            className="bg-green-500 hover:bg-green-700"
            onClick={() => setShowReportModal(true)}
          >
            {sidebarOpen ? "View System Report" : "Report"}
          </Button>
        </nav>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-gray-100 p-10 overflow-y-auto">
        {/* Top Navbar */}
        <header className="flex justify-between items-center mb-6 bg-white shadow-lg p-4 rounded-lg">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button
            className="bg-red-500 hover:bg-red-700"
            onClick={() => alert("Logging out...")}
          >
            Logout
          </Button>
        </header>

        {/* Main Content */}
        <motion.div
          className="text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Welcome to the AI Financial Advice System! Use the sidebar to navigate through the available features.
        </motion.div>
      </main>

      {/* Modals */}
      {showAdviceModal && (
        <FinancialAdviceModal onClose={() => setShowAdviceModal(false)} />
      )}
      {showReportModal && (
        <SystemReportModal onClose={() => setShowReportModal(false)} />
      )}
    </div>
  );
}
