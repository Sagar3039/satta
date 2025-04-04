
import { useState } from 'react';
import MainLayout from "@/layout/MainLayout";
import GameCard from "@/components/GameCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

// Mock data
const allGames = [
  { id: 'delhi-bazar', name: 'Delhi Bazar', latestResult: '34', resultTime: 'Today, 11:30 AM', isLive: true, popularity: 85 },
  { id: 'shree-ganes', name: 'Shree Ganes', latestResult: '72', resultTime: 'Today, 10:45 AM', isLive: false, popularity: 60 },
  { id: 'faridabad', name: 'Faridabad', latestResult: '91', resultTime: 'Yesterday, 6:00 PM', isLive: false, popularity: 75 },
  { id: 'lucky-seven', name: 'Lucky Seven', latestResult: '07', resultTime: 'Yesterday, 8:15 PM', isLive: false, popularity: 50 },
  { id: 'gaziyabad', name: 'Gaziyabad', resultTime: 'Coming today at 8:30 PM', isLive: false, popularity: 70 },
  { id: 'gali', name: 'Gali', resultTime: 'Coming today at 11:30 PM', isLive: false, popularity: 65 },
  { id: 'desawar', name: 'Desawar', resultTime: 'Coming tomorrow at 5:00 AM', isLive: false, popularity: 80 },
  { id: 'new-faridabad', name: 'New Faridabad', latestResult: '56', resultTime: 'Yesterday, 3:30 PM', isLive: false, popularity: 40 },
  { id: 'old-delhi', name: 'Old Delhi', latestResult: '28', resultTime: 'Yesterday, 5:00 PM', isLive: false, popularity: 45 },
];

const Games = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredGames = allGames.filter(game => 
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <section className="py-24 relative">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black z-0"></div>
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">
                <span className="gold-text">All Games</span>
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Browse through our complete collection of Satta King games. Select any game to view its details and place bets.
              </p>
            </div>
            
            <div className="flex items-center max-w-md mx-auto mb-12 relative">
              <div className="absolute left-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search games..."
                className="pl-10 bg-secondary/30 border-white/10 focus:border-gold/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {filteredGames.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredGames.map((game) => (
                  <GameCard
                    key={game.id}
                    id={game.id}
                    name={game.name}
                    latestResult={game.latestResult}
                    resultTime={game.resultTime}
                    isLive={game.isLive}
                    popularity={game.popularity}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No games found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Games;
