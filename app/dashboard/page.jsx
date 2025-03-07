"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaHome } from "react-icons/fa";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import { BiSolidReport } from "react-icons/bi";
import { TbReportSearch } from "react-icons/tb";
import { MdOutlineSpeakerNotes } from "react-icons/md";
import FinancialAdviceForm from "@/components/financialAdviceForm";
import ChatBox from "@/components/chatbox";
import SystemReport from "@/components/systemReport";
import MarketInsight from "@/components/marketInsight";

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeFeature, setActiveFeature] = useState("welcome"); // Controls what is displayed
    const [videoMessage, setVideoMessage] = useState(null);
    const router = useRouter();


    const handleVideoResponse = (video) => {
      setVideoMessage(video);
    };


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
            {sidebarOpen ? "Ask for Financial Advice" : <MdOutlineSpeakerNotes />}
          </Button>
          <Button className="bg-green-500 hover:bg-green-700" onClick={() => setActiveFeature("report")}>
            {sidebarOpen ? "View System Report" : <BiSolidReport />}
          </Button>
          <Button className="bg-yellow-500 hover:bg-yellow-700" onClick={() => setActiveFeature("insight")}>
            {sidebarOpen ? "View Market Insights" : <TbReportSearch />}
          </Button>
        </nav>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-gray-100 p-10 overflow-y-auto">
        {/* Top Navbar */}
        <header className="flex justify-between items-center mb-6 bg-white shadow-lg p-4 rounded-lg">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          

          <UserButton />
        </header>

        {/* Dynamic Main Content */}
        <div className="flex flex-row" >
          <motion.div className="text-lg bg-white p-6 rounded-lg shadow-lg mr-2"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
          >
            {activeFeature === "welcome" && (
              <p>Welcome to Gamma AI Financial Advice System! <br/> Use the sidebar to navigate through the available features.</p>
            )}
            {/* {activeFeature === "advice" && <FinancialAdviceForm />} */}
            {activeFeature === "advice" && <ChatBox onVideoResponse={handleVideoResponse}/>}
            {activeFeature === "report" && <SystemReport />}
            {activeFeature === "insight" && <MarketInsight />}
          </motion.div>

          <div className="">
          {videoMessage && (
            <div className="video-container mt-6 p-4 bg-white shadow-md rounded-lg w-full max-w-2xl">
              <h3 className="text-lg font-bold mb-2">Gama Advisor Video Response</h3>
              <p>{videoMessage.text}</p>
              {/* Placeholder for Video Rendering */}
              <video className="w-full rounded-lg" controls>
                <source src="/stock1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          </div>
        </div>
      </main>
    </div>
  );
}
