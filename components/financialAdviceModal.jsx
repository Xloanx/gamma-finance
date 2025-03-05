'use client';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import StockSelect from './stock-select';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

const FinancialAdviceModal = () => {
    return ( 
        <Dialog 
        // open={openAdviceModal} onOpenChange={setOpenAdviceModal}
        >
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
     );
}
 
export default FinancialAdviceModal;