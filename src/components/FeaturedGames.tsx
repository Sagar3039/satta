import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import GameCard from '@/components/GameCard';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const gameMeta = [
  { id: 'Desawar', name: 'Desawar' },
  { id: 'Shri Ganesh', name: 'Shree Ganes' },
  { id: 'Faridabad', name: 'Faridabad' },
  { id: 'Lucky Seven', name: 'Lucky Seven' },
  { id: 'Gaziyabad', name: 'Gaziyabad' },
  { id: 'Gali', name: 'Gali' },
  { id: 'Delhi Bazar', name: 'Delhi Bazar' },
];

const FeaturedGames = () => {
  const [featuredGames, setFeaturedGames] = useState([]);
  const [visibleGames, setVisibleGames] = useState(4);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'games'), (snapshot) => {
      const resultsList = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        const resultArray = data.results ?? [];
        const gameId = doc.id;
        const meta = gameMeta.find((m) => m.id === gameId);

        resultArray.forEach((result, index) => {
          resultsList.push({
            id: gameId + '_' + index,
            name: meta?.name || gameId,
            latestResult: result?.value || '—',
            resultTime: result?.date
              ? new Date(result.date).toLocaleString('en-IN', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })
              : 'Coming Soon',
            resultDate: result?.date || '',
          });
        });
      });

      // Sort chronologically (oldest first)
      const sorted = [...resultsList].sort(
        (a, b) => new Date(a.resultDate).getTime() - new Date(b.resultDate).getTime()
      );
      setFeaturedGames(sorted);
    });

    return () => unsubscribe();
  }, []);

  const handleShowMore = () => setVisibleGames(featuredGames.length);
  const handleShowLess = () => setVisibleGames(4);

  return (
    <section id="featured-games" className="py-16 bg-black/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">
            <span className="text-white">Featured </span>
            <span className="gold-text">Games</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Check out our most recently uploaded game results.
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
