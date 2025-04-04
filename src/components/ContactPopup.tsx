
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PhoneCall } from "lucide-react";

interface ContactPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactPopup = ({ isOpen, onClose }: ContactPopupProps) => {
  const phoneNumber = "+91 62965 07452";

  const handleCallClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${phoneNumber.replace(/\+/g, '')}`, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-background border border-gold/20 shadow-lg shadow-gold/5">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center gold-text">Contact for Betting</DialogTitle>
          <DialogDescription className="text-center text-gray-400 mt-2">
            Reach out to us for placing bets and inquiries
          </DialogDescription>
        </DialogHeader>
        
        <div className="my-6 flex flex-col items-center justify-center space-y-4">
          <div className="text-center">
            <PhoneCall className="w-16 h-16 text-gold mx-auto mb-4" />
            <p className="text-white text-xl font-semibold">{phoneNumber}</p>
            <p className="text-gray-400 mt-2">Available 24/7 for betting inquiries</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full">
            <Button 
              onClick={handleCallClick}
              className="flex-1 bg-gold hover:bg-gold-light text-black font-semibold"
            >
              Call Now
            </Button>
            <Button 
              onClick={handleWhatsAppClick}
              className="flex-1 bg-green-600 hover:bg-green-500 text-white font-semibold"
            >
              WhatsApp
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactPopup;
