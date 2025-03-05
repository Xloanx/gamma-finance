'use client';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
const SystemReportModal = () => {
    return ( 
        <Dialog open={openReportModal} onOpenChange={setOpenReportModal}>
        <DialogContent>
          <DialogTitle>System Report</DialogTitle>
          <p>Coming soon... View system performance and insights.</p>
        </DialogContent>
      </Dialog>
     );
}
 
export default SystemReportModal;