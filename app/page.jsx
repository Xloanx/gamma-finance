'use client'

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { SignInButton } from "@clerk/nextjs";
import { Button } from '@/components/ui/button';
import { SignedIn, SignedOut } from '@clerk/nextjs';

const featuredStocks = [
  { name: "NVIDIA", symbol: "NVDA" },
  { name: "Tesla", symbol: "TSLA" },
  { name: "Alphabet", symbol: "GOOG" },
  { name: "Apple", symbol: "AAPL" },
  { name: "Microsoft", symbol: "MSFT" },
];

const LandingPage = () => {
  const [stockData, setStockData] = useState('');
  const router = useRouter();
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = new WebSocket('wss://ws.finnhub.io?token=cv49kg9r01qn2ga8ublgcv49kg9r01qn2ga8ubm0');

    socketRef.current.addEventListener('open', () => {
      featuredStocks.forEach((stock) =>
        socketRef.current.send(JSON.stringify({ 'type': 'subscribe', 'symbol': stock.symbol }))
      );
    });

    socketRef.current.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      if (message.data && message.data.length > 0) {
        const formattedData = message.data.map(item => `${item.s}: $${item.p.toFixed(2)}`).join(' | ');
        setStockData(formattedData);
      }
    });

    return () => {
      if (socketRef.current) socketRef.current.close();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col items-center justify-center text-white p-10 text-center overflow-hidden">

      {/* Stock Ticker */}
      <div className="absolute top-0 left-0 w-full bg-black text-white py-2 overflow-hidden flex">
        <marquee behavior="scroll" direction="left" className="text-sm font-semibold">
          {stockData}
        </marquee>
      </div>

      {/* Background Overlay */}
      <motion.div 
        className="absolute inset-0 opacity-30 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2 }}
      >
        <Image src="/stock-trend-bg.jpeg" alt="Stock Market Trends" fill className="object-cover" />
      </motion.div>

      {/* Main Heading */}
      <motion.h1 
        className="text-5xl font-extrabold mb-6 relative z-10 text-blue-400"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Gamma Financial Advisor
      </motion.h1>
      
      {/* Project Description */}
      <motion.p 
        className="text-lg mb-10 max-w-3xl relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        AI-powered financial insights for smarter investments.  
        Stay ahead of the market with real-time data, predictive analytics, and intelligent financial reports.
      </motion.p>
      
      {/* CTA Buttons */}
      <motion.div
        className="relative z-10 space-y-6 flex flex-col md:flex-row gap-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <SignedIn>
          <Button 
            className="bg-blue-500 hover:bg-blue-700 px-6 py-3 text-lg rounded-full shadow-lg"
            onClick={() => router.push("/dashboard")}
          >
            Enter Dashboard
          </Button>
        </SignedIn>

        <SignedOut>
          <SignInButton mode="modal" forceRedirectUrl="/dashboard">
            <Button className="bg-green-500 hover:bg-green-700 px-6 py-3 text-lg rounded-full shadow-lg">
              Get Started
            </Button>
          </SignInButton>
        </SignedOut>
      </motion.div>

      {/* Additional Features */}
      <motion.div
        className="relative z-10 mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-blue-400">Live Market Data</h3>
          <p className="text-sm text-gray-300">Track real-time stock trends and financial movements.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-green-400">Predictive Insights</h3>
          <p className="text-sm text-gray-300">Leverage AI to forecast stock movements with precision.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-yellow-400">Smart Financial Reports</h3>
          <p className="text-sm text-gray-300">Get automated, AI-enhanced investment reports.</p>
        </div>
      </motion.div>

    </div>
  );
};

export default LandingPage;
