
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PhoneCall, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ContactPopup from '@/components/ContactPopup';

const Navbar = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold gold-text">SUPER FAST </span>
            <span className="ml-1 text-xl neon-text animate-pulse-neon">RESULTS</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-white hover:text-gold transition-colors">Home</Link>
            <Link to="/games" className="text-white hover:text-gold transition-colors">Games</Link>
            <Link to="/results" className="text-white hover:text-gold transition-colors">Results</Link>
            <Link to="/statistics" className="text-white hover:text-gold transition-colors">Statistics</Link>
            <Button 
              onClick={() => setIsContactOpen(true)}
              className="bg-gold hover:bg-gold-light text-black font-semibold flex items-center"
            >
              <PhoneCall className="mr-2 h-4 w-4" />
              Contact for Betting
            </Button>
          </div>

          {/* Mobile Navigation Toggle */}
          <Button 
            variant="ghost" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </nav>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-secondary/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link to="/" className="text-white hover:text-gold py-2 transition-colors">Home</Link>
            <Link to="/games" className="text-white hover:text-gold py-2 transition-colors">Games</Link>
            <Link to="/results" className="text-white hover:text-gold py-2 transition-colors">Results</Link>
            <Link to="/statistics" className="text-white hover:text-gold py-2 transition-colors">Statistics</Link>
            <Button 
              onClick={() => {
                setIsContactOpen(true);
                setIsMenuOpen(false);
              }}
              className="bg-gold hover:bg-gold-light text-black font-semibold flex items-center"
            >
              <PhoneCall className="mr-2 h-4 w-4" />
              Contact for Betting
            </Button>
          </div>
        </div>
      )}

      {/* Contact Popup */}
      <ContactPopup isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </header>
  );
};

export default Navbar;
