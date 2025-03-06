'use client'

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { SignInButton } from "@clerk/nextjs";
import { Button } from '@/components/ui/button';
import { SignedIn, SignedOut, SignOutButton } from '@clerk/nextjs';

const featuredStocks = [
  { name: "NVIDIA", symbol: "NVDA"},
  { name: "Tesla", symbol: "TSLA"},
  { name: "Alphabet", symbol: "GOOG"},
  { name: "Apple", symbol: "AAPL"},
  { name: "Microsoft", symbol: "MSFT"},
];

const LandingPage = () => {
  const [stockData, setStockData] = useState('');  // State to hold the formatted fetched stock data
  const router = useRouter();
  const socketRef = useRef(null); // To persist WebSocket across renders
  
    useEffect(() => {
      // Initialize WebSocket connection
      socketRef.current = new WebSocket('wss://ws.finnhub.io?token=cv49kg9r01qn2ga8ublgcv49kg9r01qn2ga8ubm0');
  
      // Connection opened -> Subscribe
      socketRef.current.addEventListener('open', () => {
        {

          featuredStocks.map((stock) => socketRef.current.send(JSON.stringify({'type': 'subscribe', 'symbol': stock.symbol})));
        }
      });
  
      // Listen for messages
      socketRef.current.addEventListener('message', (event) => {
        // Parse incoming message
        const message = JSON.parse(event.data);
        if (message.data && message.data.length > 0) {
          // Map the stock data to "stock_name: stock_price" format
          const formattedData = message.data.map(item => `${item.s}: $${item.p.toFixed(2)}`).join(' | ');
  
          // Update the stock data state
          setStockData(formattedData);
        }
      });
  
      // Cleanup on component unmount
      return () => {
        if (socketRef.current) {
          socketRef.current.close();  // Ensure WebSocket is closed on component unmount
        }
      };
    }, []); // Empty dependency array ensures this effect runs once when the component mounts


 // Function to safely send messages (check if socket is open)
 const sendMessage = (message) => {
  if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
    socketRef.current.send(JSON.stringify(message));
  } else {
    console.warn('WebSocket is not open, message not sent.');
  }
};



  return (
    <div className="relaive min-h-screen bg-gradient-to-br from-blue-900 via-black 
                  to-gray-900 flex flex-col items-center justify-center 
                  text-white p-10 text-center overflow-hidden">


      {/* Stock Ticker */}
      <div className="absolute top-0 left-0 w-full bg-black text-white py-2 overflow-hidden flex flex-row">
        <marquee behavior="scroll" direction="left" className="text-sm font-semibold">
          {stockData}
        </marquee> 

     
        {/* <SignedIn>
        <SignOutButton
        style={{ backgroundColor: '#ef4444', color: 'white', borderRadius: '8px' }}
      />
          </SignedIn> */}
      </div>

      {/* Background Image */}
      <motion.div 
        className="absolute inset-0 opacity-20 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2 }}
      >
        <Image src="/stock-trend-bg.jpeg" alt="Stock Trend" fill className="object-cover" />
      </motion.div>

      {/* Title & Description */}          
      <motion.h1 
        className="text-5xl font-bold mb-6 relative z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome to Gamma Advisor Financial System
      </motion.h1>
      
      <motion.p 
        className="text-lg mb-10 max-w-2xl relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Get intelligent financial advice on various stocks like NVIDIA (NVDA), Tesla (TSLA), and 
        Alphabet (GOOG), powered by AI and market insights.
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
