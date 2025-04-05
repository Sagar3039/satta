import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResultTable from "@/components/ResultTable";
import { useResults } from "@/context/ResultsContext";

const LatestResults = () => {
  const { results } = useResults();

  const defaultGames = [
    "Delhi bazar",
    "Shree ganesh",
    "Faridabad",
    "Lucky seven",
    "Gaziyabad",
    "Gali ",
    "Desawar",
  ];

  const filteredResults = Object.fromEntries(
    Object.entries(results).filter(([gameId]) => defaultGames.includes(gameId))
  );

  const sortedGames = defaultGames
    .filter((gameId) => filteredResults[gameId]?.results?.length)
    .sort((a, b) => {
      const aDate = new Date(
        filteredResults[a].results.at(-1)?.date || 0
      ).getTime();
      const bDate = new Date(
        filteredResults[b].results.at(-1)?.date || 0
      ).getTime();
      return bDate - aDate;
    });

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">
            <span className="text-white">Latest </span>
            <span className="gold-text">Results</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Stay updated with the most recent results from our popular games.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Tabs defaultValue={sortedGames[0]} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
              {sortedGames.map((gameId) => (
                <TabsTrigger
                  key={gameId}
                  value={gameId}
                  className="data-[state=active]:bg-gold data-[state=active]:text-black"
                >
                  {gameId.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                </TabsTrigger>
              ))}
            </TabsList>

            {sortedGames.map((gameId) => {
              const game = filteredResults[gameId];
              return (
                <TabsContent key={gameId} value={gameId}>
                  <ResultTable
                    gameId={gameId}
                    gameName={game.name}
                    results={game.results}
                  />
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default LatestResults;
