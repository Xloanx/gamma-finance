'use client';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

const MarketInsightModal = () => {
    return ( 
        <Dialog 
        // open={openInsightsModal} onOpenChange={setOpenInsightsModal}
        >
        <DialogContent>
          <DialogTitle>Market Insights</DialogTitle>
          <p>Coming soon... Browse the latest market news and trends.</p>
        </DialogContent>
      </Dialog>
     );
}
 
export default MarketInsightModal;