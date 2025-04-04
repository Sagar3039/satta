
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Shield, Award, ArrowRight } from "lucide-react";

const InfoSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-transparent to-black/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">
            <span className="text-white">Why Choose </span>
            <span className="gold-text">Satta King Delhi</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Experience the best betting platform with reliable results and dedicated support.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-secondary/30 border border-white/5 hover:border-gold/20 transition-all">
            <CardContent className="pt-8 pb-6 px-6 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-5">
                <Clock className="w-7 h-7 text-gold" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Real-Time Results</h3>
              <p className="text-gray-400">
                Get instant access to game results as soon as they are announced. Stay ahead with our real-time updates.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-secondary/30 border border-white/5 hover:border-gold/20 transition-all">
            <CardContent className="pt-8 pb-6 px-6 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-5">
                <Shield className="w-7 h-7 text-gold" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Secure Betting</h3>
              <p className="text-gray-400">
                Place your bets with confidence. We prioritize your security and ensure a safe betting experience.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-secondary/30 border border-white/5 hover:border-gold/20 transition-all">
            <CardContent className="pt-8 pb-6 px-6 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-5">
                <Award className="w-7 h-7 text-gold" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Expert Support</h3>
              <p className="text-gray-400">
                Our dedicated team is available 24/7 to assist you with any questions or concerns regarding your bets.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 text-center">
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
    </section>
  );
};

export default InfoSection;
