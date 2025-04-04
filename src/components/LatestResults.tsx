
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResultTable from "@/components/ResultTable";
import { useResults } from "@/context/ResultsContext";

const LatestResults = () => {
  const { results } = useResults();
  
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
          <Tabs defaultValue="delhi-bazar" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="delhi-bazar" className="data-[state=active]:bg-gold data-[state=active]:text-black">Delhi Bazar</TabsTrigger>
              <TabsTrigger value="shree-ganes" className="data-[state=active]:bg-gold data-[state=active]:text-black">Shree Ganes</TabsTrigger>
              <TabsTrigger value="faridabad" className="data-[state=active]:bg-gold data-[state=active]:text-black">Faridabad</TabsTrigger>
              <TabsTrigger value="lucky-seven" className="data-[state=active]:bg-gold data-[state=active]:text-black">Lucky Seven</TabsTrigger>
            </TabsList>
            
            {Object.entries(results).map(([gameId, game]) => (
              <TabsContent key={gameId} value={gameId}>
                <ResultTable 
                  gameId={gameId} 
                  gameName={game.name} 
                  results={game.results} 
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default LatestResults;
