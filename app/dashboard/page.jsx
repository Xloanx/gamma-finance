"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaHome } from "react-icons/fa";
import { UserButton } from "@clerk/nextjs";
import { BiSolidReport } from "react-icons/bi";
import { TbReportSearch } from "react-icons/tb";
import { MdOutlineSpeakerNotes } from "react-icons/md";
import ChatBox from "@/components/chatbox";
import SystemReport from "@/components/systemReport";
import PredictiveModel from "@/components/predictiveModel";
import MarketInsights from "@/components/marketInsights";
import LiveMarketData from "@/components/liveMarketData";
import HistoricalDataChart from "@/components/historicalDataChart";
// import SendUserData from "./sendUserData";
import FinancialNewsFeed from "@/components/financialNewsFeed";
import AnomalyDetectionChart from "@/components/anomalyDetectionChart";
import PredictionConfidence from "@/components/predictionConfidence";
import AnalystFeedback from "@/components/analystFeedback";
// import VoiceInteraction from "@/components/voiceInteraction";


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
      {/* <SendUserData /> */}
      {/* Sidebar Navigation */}
      <motion.aside
        className={`${
          sidebarOpen ? "w-1/5" : "w-16"
        } bg-gray-900 text-white p-6 flex flex-col transition-all duration-300 overflow-hidden`}
        initial={{ width: sidebarOpen ? "20%" : "4rem" }}
        animate={{ width: sidebarOpen ? "20%" : "4rem" }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className={`${sidebarOpen ? "text-2xl font-bold" : "hidden"}`}>Γ Finance</h2>
          <Button
            variant="ghost"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        <nav className="flex flex-col gap-4">
          {[
            { feature: "welcome", label: "Live Market", c1:"bg-gray-500", c2:"hover:bg-gray-700", icon: <MdOutlineSpeakerNotes /> },
            { feature: "advice", label: "Financial Advice", c1:"bg-blue-500 ", c2:"hover:bg-blue-700", icon: <MdOutlineSpeakerNotes /> },
            { feature: "report", label: "System Report", c1:"bg-green-500 ", c2:"hover:bg-green-700", icon: <BiSolidReport /> },
            { feature: "predictive", label: "Predictive Modeling", c1:"bg-purple-500 ", c2:"hover:bg-purple-700", icon: <TbReportSearch /> },
            { feature: "insight", label: "Market Insights & Trends", c1:"bg-yellow-500 ", c2:"hover:bg-yellow-700", icon: <TbReportSearch /> },
          ].map(({ feature, label, icon, c1, c2 }) => (
            <Button
              key={feature}
              className={`${
                activeFeature === feature ? c1 : c2
              } flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300`}
              onClick={() => setActiveFeature(feature)}
            >
              {sidebarOpen ? label : <span title={label}>{icon}</span>}
            </Button>
          ))}
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
        {/* <div className="flex flex-row" > */}
        <motion.div
          className="text-lg bg-white p-1 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >

            {activeFeature === "welcome" && (
              <div>
                <p>Welcome to Γ Finance System! <br/> Use the sidebar to navigate through the available features.</p>
                <LiveMarketData />
              </div>
            )}

            {activeFeature === "advice" && (
              <div>
                <ChatBox />
                {/* <VoiceInteraction /> */}
              </div>
            )}
            {activeFeature === "report" && (
              <div>
                <SystemReport />
              </div>
            )
            }
            {activeFeature === "insight" && (
              <div>
                <MarketInsights />
                <HistoricalDataChart />
                <FinancialNewsFeed />
                <AnomalyDetectionChart />
              </div>
            )}
            {activeFeature === "predictive" && (
              <div>
                <PredictiveModel />
                <PredictionConfidence />
                <AnalystFeedback />
              </div>
            )}
          </motion.div>
      </main>

      <div className="fixed bottom-6 right-6 flex flex-col gap-2">
        <Button className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-700" 
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
        <Button className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-700" 
          onClick={() => setActiveFeature("advice")}
        >
          💬
        </Button>
      </div>



    </div>
  );
}
