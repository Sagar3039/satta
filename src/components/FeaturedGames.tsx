
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import GameCard from '@/components/GameCard';

// Mock data
const featuredGames = [
  { id: 'delhi-bazar', name: 'Delhi Bazar', latestResult: '34', resultTime: 'Today, 11:30 AM', isLive: true, popularity: 85 },
  { id: 'shree-ganes', name: 'Shree Ganes', latestResult: '72', resultTime: 'Today, 10:45 AM', isLive: false, popularity: 60 },
  { id: 'faridabad', name: 'Faridabad', latestResult: '91', resultTime: 'Yesterday, 6:00 PM', isLive: false, popularity: 75 },
  { id: 'lucky-seven', name: 'Lucky Seven', latestResult: '07', resultTime: 'Yesterday, 8:15 PM', isLive: false, popularity: 50 },
  { id: 'gaziyabad', name: 'Gaziyabad', resultTime: 'Coming today at 8:30 PM', isLive: false, popularity: 70 },
  { id: 'gali', name: 'Gali', resultTime: 'Coming today at 11:30 PM', isLive: false, popularity: 65 },
  { id: 'desawar', name: 'Desawar', resultTime: 'Coming tomorrow at 5:00 AM', isLive: false, popularity: 80 },
];

const FeaturedGames = () => {
  const [visibleGames, setVisibleGames] = useState(4);
  
  const handleShowMore = () => {
    setVisibleGames(featuredGames.length);
  };
  
  const handleShowLess = () => {
    setVisibleGames(4);
  };

  return (
    <section id="featured-games" className="py-16 bg-black/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">
            <span className="text-white">Featured </span>
            <span className="gold-text">Games</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Check out our most popular games and their latest results. Stay updated with real-time information.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredGames.slice(0, visibleGames).map((game) => (
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
        
        <div className="text-center mt-10">
          {visibleGames < featuredGames.length ? (
            <Button 
              onClick={handleShowMore}
              variant="outline"
              className="border-white/20 hover:border-gold/50 bg-transparent text-white hover:text-gold"
            >
              Show More Games
            </Button>
          ) : (
            <Button 
              onClick={handleShowLess}
              variant="outline"
              className="border-white/20 hover:border-gold/50 bg-transparent text-white hover:text-gold"
            >
              Show Less
            </Button>
          )}
          
          <div className="mt-8">
            <Link to="/games">
              <Button className="bg-gold hover:bg-gold-light text-black font-semibold">
                View All Games
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedGames;
