
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PhoneCall } from 'lucide-react';
import ContactPopup from '@/components/ContactPopup';

const CTASection = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 z-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/3 w-40 h-40 rounded-full bg-purple-500/10 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/5 w-60 h-60 rounded-full bg-blue-500/10 blur-3xl"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-4xl mx-auto glass-card p-8 md:p-12">
          <div className="text-center">
            
          <div className="flex flex-wrap justify-center gap-8 pt-10 text-center">
            <div className="p-6 glass-card">
              <h3 className="text-xl font-semibold text-white mb-2">Fast Results</h3>
              <p className="text-gray-400">Get the latest results instantly</p>
            </div>
            <div className="p-6 glass-card">
              <h3 className="text-xl font-semibold text-white mb-2">24/7 Support</h3>
              <p className="text-gray-400">Betting assistance anytime</p>
            </div>
            <div className="p-6 glass-card">
              <h3 className="text-xl font-semibold text-white mb-2">Secure Betting</h3>
              <p className="text-gray-400">Safe and reliable platform</p>
            </div>
          </div>
            
            
          </div>
        </div>
      </div>
      
      <ContactPopup isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
};

export default CTASection;
