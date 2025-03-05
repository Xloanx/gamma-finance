'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { SignInButton } from "@clerk/nextjs";
import { Button } from '@/components/ui/button';
import { useAuth, useUser, SignedIn, SignedOut, SignOutButton } from '@clerk/nextjs';


const LandingPage = () => {
  const [stockPrices, setStockPrices] = useState([]);
  const router = useRouter();

  const {userId, sessionId} = useAuth();

  // Simulate fetching stock prices
  useEffect(() => {
    const fetchStockPrices = () => {
      const stocks = [
        { name: "NVIDIA (NVDA)", price: (500 + Math.random() * 10).toFixed(2) },
        { name: "Tesla (TSLA)", price: (250 + Math.random() * 10).toFixed(2) },
        { name: "Alphabet (GOOG)", price: (130 + Math.random() * 5).toFixed(2) },
        { name: "Apple (AAPL)", price: (180 + Math.random() * 5).toFixed(2) },
        { name: "Microsoft (MSFT)", price: (350 + Math.random() * 5).toFixed(2) },
      ];
      setStockPrices(stocks);
    };

    fetchStockPrices();
    const interval = setInterval(fetchStockPrices, 5000); // Update prices every 5s

    return () => clearInterval(interval);
  }, []);


  return (
    <div className="relaive min-h-screen bg-gradient-to-br from-blue-900 via-black 
                  to-gray-900 flex flex-col items-center justify-center 
                  text-white p-10 text-center overflow-hidden">
      {/* Stock Ticker */}
      <div className="absolute top-0 left-0 w-full bg-black text-white py-2 overflow-hidden flex flex-row">
        <marquee behavior="scroll" direction="left" className="text-sm font-semibold">
          {stockPrices.map((stock, index) => (
            <span key={index} className="mx-6">
              {stock.name}: ${stock.price}
            </span>
          ))}
        </marquee>
        <SignedIn>
        <SignOutButton>
            <Button 
              className="bg-red-500 hover:bg-red-700" 
              >
              Logout
            </Button>
          </SignOutButton>
          </SignedIn>
      </div>

      {/* Background Image */}
      <motion.div 
        className="absolute inset-0 opacity-20 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2 }}
      >
        <Image src="/stock-trend-bg.jpeg" alt="Stock Trend" fill className="object-cover" />
        {/* <img src="/stock-trend-bg.jpeg" alt="Stock Trend" className="w-full h-full object-cover" /> */}
      </motion.div>

      {/* Title & Description */}          
      <motion.h1 
        className="text-5xl font-bold mb-6 relative z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome to Gamma Advisor Financial Advice System
      </motion.h1>
      
      <motion.p 
        className="text-lg mb-10 max-w-2xl relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Get intelligent financial advice on NVIDIA (NVDA), Tesla (TSLA), and 
        Alphabet (GOOG) powered by AI and market insights.
      </motion.p>
      
      <motion.div
        className="relative z-10 space-y-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        
       <SignedIn>
          <Button className="bg-blue-500 hover:bg-blue-700 px-6 py-3 text-lg rounded-full shadow-lg mr-4"
            onClick={() => router.push("/dashboard")}
            >
            Back To Dashboard
          </Button>
       </SignedIn>

      <SignedOut>
        <SignInButton mode="modal" forceRedirectUrl="/dashboard" >
            <Button className="bg-blue-500 hover:bg-blue-700 px-6 py-3 text-lg rounded-full shadow-lg mr-4"
            // onClick={() => router.push("/dashboard")}
            >
            Get Started
            </Button>
          </SignInButton>
      </SignedOut>
                 
      </motion.div>
    </div>
  );
};

export default LandingPage;
