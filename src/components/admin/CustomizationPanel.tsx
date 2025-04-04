
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Check, Image, Plus, Trash2 } from "lucide-react";

const CustomizationPanel = () => {
  const [contactNumber, setContactNumber] = useState("+91 62965 07452");
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const [banners, setBanners] = useState([
    { id: "1", title: "Welcome Offer", description: "Get 10% extra on your first bet!", active: true },
    { id: "2", title: "Special Game", description: "Don't miss Delhi Bazar special game today!", active: true },
  ]);
  const [newBannerTitle, setNewBannerTitle] = useState("");
  const [newBannerDesc, setNewBannerDesc] = useState("");
  
  const { toast } = useToast();

  const handleSaveContactInfo = () => {
    toast({
      title: "Success",
      description: "Contact information updated successfully",
    });
  };

  const handleAddBanner = () => {
    if (!newBannerTitle || !newBannerDesc) {
      toast({
        title: "Error",
        description: "Please fill all banner fields",
        variant: "destructive",
      });
      return;
    }
    
    const newBanner = {
      id: Date.now().toString(),
      title: newBannerTitle,
      description: newBannerDesc,
      active: true,
    };
    
    setBanners([...banners, newBanner]);
    setNewBannerTitle("");
    setNewBannerDesc("");
    
    toast({
      title: "Success",
      description: "Banner added successfully",
    });
  };

  const toggleBannerStatus = (id) => {
    setBanners(banners.map(banner => 
      banner.id === id ? { ...banner, active: !banner.active } : banner
    ));
  };

  const deleteBanner = (id) => {
    setBanners(banners.filter(banner => banner.id !== id));
    toast({
      title: "Success",
      description: "Banner deleted successfully",
    });
  };

  return (
    <div className="space-y-8">
      <Card className="bg-black/40 border border-white/10">
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>
            Update the contact information displayed to users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="contact-number" className="block text-white mb-2">Contact Number</Label>
              <Input
                id="contact-number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className="bg-black/60 border-white/20"
              />
              <p className="text-xs text-gray-400 mt-1">
                This number will be displayed for betting inquiries
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="whatsapp"
                checked={whatsappEnabled}
                onCheckedChange={setWhatsappEnabled}
              />
              <Label htmlFor="whatsapp" className="text-white">Enable WhatsApp button</Label>
            </div>
            
            <Button 
              onClick={handleSaveContactInfo}
              className="bg-gold hover:bg-gold/80 text-black"
            >
              <Check className="mr-2 h-4 w-4" />
              Save Contact Information
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-black/40 border border-white/10">
        <CardHeader>
          <CardTitle>Site Banners & Announcements</CardTitle>
          <CardDescription>
            Manage banners and special announcements shown on the website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-3">
                <h3 className="text-lg font-semibold mb-2">Add New Banner</h3>
              </div>
              
              <div>
                <Label htmlFor="banner-title" className="block text-white mb-2">Banner Title</Label>
                <Input
                  id="banner-title"
                  value={newBannerTitle}
                  onChange={(e) => setNewBannerTitle(e.target.value)}
                  placeholder="e.g. Special Offer"
                  className="bg-black/60 border-white/20"
                />
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="banner-desc" className="block text-white mb-2">Banner Description</Label>
                <div className="flex gap-2">
                  <Input
                    id="banner-desc"
                    value={newBannerDesc}
                    onChange={(e) => setNewBannerDesc(e.target.value)}
                    placeholder="Enter banner text here"
                    className="bg-black/60 border-white/20"
                  />
                  <Button 
                    onClick={handleAddBanner}
                    className="bg-gold hover:bg-gold/80 text-black"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Current Banners</h3>
              
              {banners.length === 0 ? (
                <p className="text-gray-400">No banners added yet</p>
              ) : (
                <div className="space-y-4">
                  {banners.map(banner => (
                    <div 
                      key={banner.id} 
                      className={`p-4 rounded-lg border ${
                        banner.active ? 'bg-black/30 border-gold/50' : 'bg-black/20 border-white/10'
                      }`}
                    >
                      <div className="flex justify-between">
                        <div>
                          <h4 className={`font-semibold ${banner.active ? 'text-gold' : 'text-gray-400'}`}>
                            {banner.title}
                          </h4>
                          <p className="text-sm text-gray-400">{banner.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center space-x-2">
                            <Switch
                              id={`banner-${banner.id}`}
                              checked={banner.active}
                              onCheckedChange={() => toggleBannerStatus(banner.id)}
                            />
                            <Label htmlFor={`banner-${banner.id}`} className="text-sm text-gray-400">
                              {banner.active ? 'Active' : 'Inactive'}
                            </Label>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => deleteBanner(banner.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-black/40 border border-white/10">
        <CardHeader>
          <CardTitle>Game Rules & Betting Odds</CardTitle>
          <CardDescription>
            Manage game rules and betting odds displayed on the website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="game-rules" className="block text-white mb-2">Game Rules</Label>
              <Textarea
                id="game-rules"
                className="bg-black/60 border-white/20 min-h-[150px]"
                placeholder="Enter game rules here..."
                defaultValue="1. Players can place bets on numbers 00-99.
2. Minimum bet amount is ₹10.
3. Results are announced daily at scheduled times.
4. Winnings are paid at 90x the bet amount."
              />
            </div>
            
            <div>
              <Label htmlFor="betting-odds" className="block text-white mb-2">Betting Odds</Label>
              <Textarea
                id="betting-odds"
                className="bg-black/60 border-white/20 min-h-[100px]"
                placeholder="Enter betting odds information here..."
                defaultValue="- Single Digit: 9x
- Double Digit: 90x
- Special Game: 180x"
              />
            </div>
            
            <Button 
              className="bg-gold hover:bg-gold/80 text-black"
            >
              <Check className="mr-2 h-4 w-4" />
              Save Rules & Odds
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomizationPanel;
