
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PhoneCall } from 'lucide-react';
import ContactPopup from '@/components/ContactPopup';

const HeroSection = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <section className="relative py-20 min-h-[80vh] flex items-center">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black z-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-1/4 w-1 h-1 bg-neon-pink rounded-full opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-1/3 w-2 h-2 bg-neon-blue rounded-full opacity-50 animate-pulse delay-75"></div>
        <div className="absolute bottom-60 left-1/2 w-1 h-1 bg-neon-green rounded-full opacity-60 animate-pulse delay-150"></div>
        <div className="absolute bottom-40 right-1/4 w-1.5 h-1.5 bg-gold rounded-full opacity-80 animate-pulse delay-300"></div>
      </div>
      
      <div className="container relative z-10 px-6 mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gold-text">SATTA KING</span>
            <span className="neon-text animate-pulse-neon ml-2">DELHI</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Daily Superfast Satta King Result of April 2025 And Leak Numbers for Gali, Desawar, Ghaziabad and Faridabad With Complete Old Satta King Chart of 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2023, 2024, 2025 From Satta King Fast, Satta King Ghaziabad, Satta King Desawar, Satta King Gali, Satta King Faridabad.
          </p>
          <p className='mb-10'>Satta-King-Fast.com is most populer gaming discussion forum for players to use freely and we are not in partenership with any gaming company.</p>
          <p className='text-yellow-500 mb-6'>कृपया ध्यान दें, लीक गेम के नाम पर किसी को कोई पैसा न दें, ना पहले ना बाद मे -धन्यवाद</p>
          <p className='mb-6'> khaiwal - (Ranveer sing)</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button 
              onClick={() => setIsContactOpen(true)}
              size="lg"
              className="bg-gold hover:bg-gold-light text-black font-semibold flex items-center px-6"
            >
              <PhoneCall className="mr-2 h-5 w-5" />
              हमसे संपर्क करने के लिए ➡️ यहाँ क्लिक करें
            </Button>
            <p>जोड़ी रेट :– 100 के 9500 रुपए।</p>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white/20 hover:bg-white/5 text-white hover:text-white px-6"
              asChild
            >
              <a href="#featured-games">View Games</a>
            </Button>
          </div>
          
          
        </div>
      </div>
      
      <ContactPopup isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
};

export default HeroSection;
