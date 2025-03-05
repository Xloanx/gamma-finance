"use client";

import { useState } from 'react';
import { useRouter } from "next/navigation";
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import StockSelect from '@/components/stock-select';



const Dashboard = () => {
  const [openAdviceModal, setOpenAdviceModal] = useState(false);
  const [openReportModal, setOpenReportModal] = useState(false);
  const [openInsightsModal, setOpenInsightsModal] = useState(false);
  const [stockQuery, setStockQuery] = useState('');
  const [response, setResponse] = useState('');
  const router = useRouter();

  const handleAdviceRequest = async () => {
    if (!stockQuery) {
      setResponse("Please enter your stock-related query.");
      return;
    }

    setResponse("Fetching financial advice...");

    // Simulated API call
    setTimeout(() => {
      setResponse(`Advice on <strong>${stockQuery}</strong>:<br /> Based on the latest data, the stock shows a positive trend.`);
    }, 2000);
    
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900 p-10 text-white">
      <motion.h1 
        className="text-4xl font-bold text-center mb-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Financial Advice Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="col-span-1">
          <Card className="bg-blue-700 shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Ask for Financial Advice</h2>
              <p className="text-sm mb-4">Get personalized insights on NVIDIA (NVDA), Tesla (TSLA), and Alphabet (GOOG).</p>
              <Button className="bg-blue-500 hover:bg-blue-700" onClick={() => setOpenAdviceModal(true)}>Get Advice</Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="col-span-1">
          <Card className="bg-green-700 shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">System Report</h2>
              <p className="text-sm mb-4">View the latest system performance and scraped data insights.</p>
              <Button className="bg-green-500 hover:bg-green-700" onClick={() => setOpenReportModal(true)}>View Report</Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="col-span-1">
          <Card className="bg-yellow-700 shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Market Insights</h2>
              <p className="text-sm mb-4">Explore the latest market news and discussions related to selected stocks.</p>
              <Button className="bg-yellow-500 hover:bg-yellow-700" onClick={() => setOpenInsightsModal(true)}>Explore Insights</Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
        className="relative z-10 space-y-6 flex justify-center items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <Button className="bg-blue-500 hover:bg-blue-700 px-6 py-3 text-lg rounded-full shadow-lg"
          onClick={() => router.push("/")}>
          Back To Home
        </Button>
      </motion.div>
      </div>

      {/* Modals */}
      <Dialog open={openAdviceModal} onOpenChange={setOpenAdviceModal}>
        <DialogContent>
          <DialogTitle>Ask for Financial Advice</DialogTitle>
          <StockSelect />
          <Input 
            className="mb-4" 
            placeholder="Enter your stock-related question..." 
            value={stockQuery} 
            onChange={(e) => setStockQuery(e.target.value)}
          />
          <Button className="bg-blue-500 hover:bg-blue-700 mb-4" onClick={handleAdviceRequest}>Submit</Button>
          {response && <Textarea className="mt-2" value={response} readOnly />}
        </DialogContent>
      </Dialog>

      <Dialog open={openReportModal} onOpenChange={setOpenReportModal}>
        <DialogContent>
          <DialogTitle>System Report</DialogTitle>
          <p>Coming soon... View system performance and insights.</p>
        </DialogContent>
      </Dialog>

      <Dialog open={openInsightsModal} onOpenChange={setOpenInsightsModal}>
        <DialogContent>
          <DialogTitle>Market Insights</DialogTitle>
          <p>Coming soon... Browse the latest market news and trends.</p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;


