import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

type GameResult = {
  date: string;
  value: string;
};

type GameData = {
  name: string;
  results: GameResult[];
};

const Results = () => {
  const [gamesData, setGamesData] = useState<Record<string, GameData>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'games'), (snapshot) => {
      const updatedGames: Record<string, GameData> = {};
      snapshot.forEach((doc) => {
        const data = doc.data() as GameData;
        updatedGames[doc.id] = {
          name: data.name,
          results: Array.isArray(data.results)
            ? data.results.sort(
                (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
              )
            : [],
        };
      });
      setGamesData(updatedGames);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold mb-4 text-center">All Game Results</h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading results...</p>
      ) : Object.keys(gamesData).length === 0 ? (
        <p className="text-center text-gray-600">No games available yet.</p>
      ) : (
        Object.entries(gamesData).map(([gameId, game]) => (
          <div
            key={gameId}
            className="bg-white shadow-md rounded-xl p-4 border border-gray-200"
          >
            <h3 className="text-xl font-semibold mb-2 text-blue-600">
              {game.name}
            </h3>

            {game.results.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {game.results.map((result, index) => (
                  <li
                    key={index}
                    className="py-2 flex justify-between text-sm text-gray-700"
                  >
                    <span>{new Date(result.date).toLocaleString()}</span>
                    <span className="font-bold text-green-700">
                      {result.value}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No results yet.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Results;
