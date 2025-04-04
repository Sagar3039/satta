
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from "@/layout/MainLayout";
import ResultTable from "@/components/ResultTable";
import { Button } from "@/components/ui/button";
import { PhoneCall, Clock, Calendar, TrendingUp, Users, History } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ContactPopup from "@/components/ContactPopup";

// Mock game data
const gameData = {
  'delhi-bazar': {
    name: 'Delhi Bazar',
    description: 'Delhi Bazar is one of the most popular Satta King games in Delhi. It has a strong following and offers exciting betting opportunities.',
    schedule: 'Daily at 11:30 AM',
    popularity: 85,
    activeUsers: '2.5K+',
    latestResult: '34',
    resultTime: 'Today, 11:30 AM',
    nextResult: 'Tomorrow, 11:30 AM',
    results: [
      { date: "04 April, 2025", value: "34" },
      { date: "03 April, 2025", value: "52" },
      { date: "02 April, 2025", value: "78" },
      { date: "01 April, 2025", value: "19" },
      { date: "31 March, 2025", value: "45" },
      { date: "30 March, 2025", value: "67" },
      { date: "29 March, 2025", value: "23" },
      { date: "28 March, 2025", value: "89" },
      { date: "27 March, 2025", value: "15" },
      { date: "26 March, 2025", value: "92" },
    ],
    chartData: [
      { number: '0', frequency: 3 },
      { number: '1', frequency: 5 },
      { number: '2', frequency: 8 },
      { number: '3', frequency: 12 },
      { number: '4', frequency: 7 },
      { number: '5', frequency: 10 },
      { number: '6', frequency: 6 },
      { number: '7', frequency: 9 },
      { number: '8', frequency: 11 },
      { number: '9', frequency: 4 },
    ],
  },
  'shree-ganes': {
    name: 'Shree Ganes',
    description: 'Shree Ganes is a traditional Satta King game that has been popular for many years. It offers reliable results and exciting gameplay.',
    schedule: 'Daily at 10:45 AM',
    popularity: 60,
    activeUsers: '1.8K+',
    latestResult: '72',
    resultTime: 'Today, 10:45 AM',
    nextResult: 'Tomorrow, 10:45 AM',
    results: [
      { date: "04 April, 2025", value: "72" },
      { date: "03 April, 2025", value: "23" },
      { date: "02 April, 2025", value: "67" },
      { date: "01 April, 2025", value: "82" },
      { date: "31 March, 2025", value: "31" },
      { date: "30 March, 2025", value: "59" },
      { date: "29 March, 2025", value: "12" },
      { date: "28 March, 2025", value: "47" },
      { date: "27 March, 2025", value: "83" },
      { date: "26 March, 2025", value: "26" },
    ],
    chartData: [
      { number: '0', frequency: 5 },
      { number: '1', frequency: 7 },
      { number: '2', frequency: 9 },
      { number: '3', frequency: 4 },
      { number: '4', frequency: 8 },
      { number: '5', frequency: 12 },
      { number: '6', frequency: 6 },
      { number: '7', frequency: 11 },
      { number: '8', frequency: 3 },
      { number: '9', frequency: 10 },
    ],
  },
  'faridabad': {
    name: 'Faridabad',
    description: 'Faridabad is a classic Satta King game with a long history. It has a dedicated player base and consistent results.',
    schedule: 'Daily at 6:00 PM',
    popularity: 75,
    activeUsers: '2.1K+',
    latestResult: '91',
    resultTime: 'Yesterday, 6:00 PM',
    nextResult: 'Today, 6:00 PM',
    results: [
      { date: "03 April, 2025", value: "91" },
      { date: "02 April, 2025", value: "45" },
      { date: "01 April, 2025", value: "29" },
      { date: "31 March, 2025", value: "73" },
      { date: "30 March, 2025", value: "12" },
      { date: "29 March, 2025", value: "64" },
      { date: "28 March, 2025", value: "38" },
      { date: "27 March, 2025", value: "57" },
      { date: "26 March, 2025", value: "19" },
      { date: "25 March, 2025", value: "82" },
    ],
    chartData: [
      { number: '0', frequency: 7 },
      { number: '1', frequency: 9 },
      { number: '2', frequency: 5 },
      { number: '3', frequency: 8 },
      { number: '4', frequency: 10 },
      { number: '5', frequency: 4 },
      { number: '6', frequency: 12 },
      { number: '7', frequency: 6 },
      { number: '8', frequency: 3 },
      { number: '9', frequency: 11 },
    ],
  },
  'lucky-seven': {
    name: 'Lucky Seven',
    description: 'Lucky Seven is a popular Satta King game known for its lucky number theme. Many players consider it to be their lucky charm.',
    schedule: 'Daily at 8:15 PM',
    popularity: 50,
    activeUsers: '1.5K+',
    latestResult: '07',
    resultTime: 'Yesterday, 8:15 PM',
    nextResult: 'Today, 8:15 PM',
    results: [
      { date: "03 April, 2025", value: "07" },
      { date: "02 April, 2025", value: "77" },
      { date: "01 April, 2025", value: "49" },
      { date: "31 March, 2025", value: "21" },
      { date: "30 March, 2025", value: "63" },
      { date: "29 March, 2025", value: "07" },
      { date: "28 March, 2025", value: "35" },
      { date: "27 March, 2025", value: "42" },
      { date: "26 March, 2025", value: "17" },
      { date: "25 March, 2025", value: "56" },
    ],
    chartData: [
      { number: '0', frequency: 4 },
      { number: '1', frequency: 6 },
      { number: '2', frequency: 9 },
      { number: '3', frequency: 5 },
      { number: '4', frequency: 8 },
      { number: '5', frequency: 7 },
      { number: '6', frequency: 10 },
      { number: '7', frequency: 12 },
      { number: '8', frequency: 3 },
      { number: '9', frequency: 4 },
    ],
  },
  'gaziyabad': {
    name: 'Gaziyabad',
    description: 'Gaziyabad is a well-established Satta King game with a loyal following. It offers exciting opportunities for players.',
    schedule: 'Daily at 8:30 PM',
    popularity: 70,
    activeUsers: '2.0K+',
    nextResult: 'Today, 8:30 PM',
    results: [
      { date: "03 April, 2025", value: "56" },
      { date: "02 April, 2025", value: "32" },
      { date: "01 April, 2025", value: "78" },
      { date: "31 March, 2025", value: "41" },
      { date: "30 March, 2025", value: "65" },
      { date: "29 March, 2025", value: "14" },
      { date: "28 March, 2025", value: "89" },
      { date: "27 March, 2025", value: "23" },
      { date: "26 March, 2025", value: "76" },
      { date: "25 March, 2025", value: "32" },
    ],
    chartData: [
      { number: '0', frequency: 5 },
      { number: '1', frequency: 8 },
      { number: '2', frequency: 10 },
      { number: '3', frequency: 6 },
      { number: '4', frequency: 9 },
      { number: '5', frequency: 7 },
      { number: '6', frequency: 11 },
      { number: '7', frequency: 4 },
      { number: '8', frequency: 9 },
      { number: '9', frequency: 6 },
    ],
  },
  'gali': {
    name: 'Gali',
    description: 'Gali is a traditional Satta King game with a strong following. It is known for its consistent results and exciting gameplay.',
    schedule: 'Daily at 11:30 PM',
    popularity: 65,
    activeUsers: '1.9K+',
    nextResult: 'Today, 11:30 PM',
    results: [
      { date: "03 April, 2025", value: "43" },
      { date: "02 April, 2025", value: "65" },
      { date: "01 April, 2025", value: "87" },
      { date: "31 March, 2025", value: "19" },
      { date: "30 March, 2025", value: "53" },
      { date: "29 March, 2025", value: "27" },
      { date: "28 March, 2025", value: "74" },
      { date: "27 March, 2025", value: "36" },
      { date: "26 March, 2025", value: "51" },
      { date: "25 March, 2025", value: "93" },
    ],
    chartData: [
      { number: '0', frequency: 3 },
      { number: '1', frequency: 9 },
      { number: '2', frequency: 7 },
      { number: '3', frequency: 8 },
      { number: '4', frequency: 10 },
      { number: '5', frequency: 6 },
      { number: '6', frequency: 5 },
      { number: '7', frequency: 11 },
      { number: '8', frequency: 7 },
      { number: '9', frequency: 9 },
    ],
  },
  'desawar': {
    name: 'Desawar',
    description: 'Desawar is one of the most popular Satta King games. It has a massive following and is known for its early morning results.',
    schedule: 'Daily at 5:00 AM',
    popularity: 80,
    activeUsers: '2.3K+',
    nextResult: 'Tomorrow, 5:00 AM',
    results: [
      { date: "03 April, 2025", value: "85" },
      { date: "02 April, 2025", value: "49" },
      { date: "01 April, 2025", value: "23" },
      { date: "31 March, 2025", value: "67" },
      { date: "30 March, 2025", value: "38" },
      { date: "29 March, 2025", value: "92" },
      { date: "28 March, 2025", value: "17" },
      { date: "27 March, 2025", value: "54" },
      { date: "26 March, 2025", value: "73" },
      { date: "25 March, 2025", value: "41" },
    ],
    chartData: [
      { number: '0', frequency: 6 },
      { number: '1', frequency: 5 },
      { number: '2', frequency: 9 },
      { number: '3', frequency: 8 },
      { number: '4', frequency: 7 },
      { number: '5', frequency: 10 },
      { number: '6', frequency: 6 },
      { number: '7', frequency: 9 },
      { number: '8', frequency: 7 },
      { number: '9', frequency: 8 },
    ],
  },
};

const GameDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isContactOpen, setIsContactOpen] = useState(false);
  
  // Default to delhi-bazar if no ID or ID not found
  const gameId = id && gameData[id] ? id : 'delhi-bazar';
  const game = gameData[gameId];

  return (
    <MainLayout>
      <section className="py-24 relative">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black z-0"></div>
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Game Header */}
            <div className="bg-secondary/30 border border-white/10 rounded-xl p-8 mb-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-3 gold-text">
                    {game.name}
                  </h1>
                  <p className="text-gray-400 max-w-2xl">
                    {game.description}
                  </p>
                </div>
                
                <div>
                  <Button 
                    onClick={() => setIsContactOpen(true)}
                    size="lg"
                    className="bg-gold hover:bg-gold-light text-black font-semibold flex items-center px-6"
                  >
                    <PhoneCall className="mr-2 h-5 w-5" />
                    Place Bet
                  </Button>
                </div>
              </div>
              
              {/* Game Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="bg-black/20 rounded-lg p-4">
                  <div className="flex items-start">
                    <Calendar className="w-5 h-5 text-gold mr-3 mt-0.5" />
                    <div>
                      <p className="text-gray-400 text-sm">Schedule</p>
                      <p className="text-white font-medium">{game.schedule}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-black/20 rounded-lg p-4">
                  <div className="flex items-start">
                    <TrendingUp className="w-5 h-5 text-gold mr-3 mt-0.5" />
                    <div>
                      <p className="text-gray-400 text-sm">Popularity</p>
                      <p className="text-white font-medium">{game.popularity}%</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-black/20 rounded-lg p-4">
                  <div className="flex items-start">
                    <Users className="w-5 h-5 text-gold mr-3 mt-0.5" />
                    <div>
                      <p className="text-gray-400 text-sm">Active Users</p>
                      <p className="text-white font-medium">{game.activeUsers}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-black/20 rounded-lg p-4">
                  <div className="flex items-start">
                    <Clock className="w-5 h-5 text-gold mr-3 mt-0.5" />
                    <div>
                      <p className="text-gray-400 text-sm">Next Result</p>
                      <p className="text-white font-medium">{game.nextResult}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Current Result (if available) */}
            {game.latestResult && (
              <div className="bg-secondary/30 border border-white/10 rounded-xl p-8 mb-10 text-center">
                <h2 className="text-2xl font-semibold mb-4">Latest Result</h2>
                <div className="flex flex-col items-center justify-center py-4">
                  <span className="gold-text text-6xl font-bold">{game.latestResult}</span>
                  {game.resultTime && (
                    <div className="flex items-center mt-4 text-gray-400">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{game.resultTime}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Tabs for Results and Statistics */}
            <div className="bg-secondary/20 rounded-xl p-6 md:p-8 border border-white/5 mb-10">
              <Tabs defaultValue="results" className="w-full">
                <TabsList className="grid grid-cols-2 mb-8 bg-black/20">
                  <TabsTrigger value="results" className="data-[state=active]:bg-gold data-[state=active]:text-black">
                    <History className="w-4 h-4 mr-2" />
                    Past Results
                  </TabsTrigger>
                  <TabsTrigger value="statistics" className="data-[state=active]:bg-gold data-[state=active]:text-black">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Statistics
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="results">
                  <div className="p-4 bg-black/10 rounded-lg mb-6">
                    <h2 className="text-xl font-semibold text-white">
                      {game.name} <span className="text-gray-400">Past Results</span>
                    </h2>
                  </div>
                  <ResultTable 
                    gameId={gameId} 
                    gameName={game.name} 
                    results={game.results} 
                  />
                </TabsContent>
                
                <TabsContent value="statistics">
                  <div className="p-4 bg-black/10 rounded-lg mb-6">
                    <h2 className="text-xl font-semibold text-white">
                      {game.name} <span className="text-gray-400">Number Frequency</span>
                    </h2>
                    <p className="text-gray-400">
                      Statistics based on the last 30 results
                    </p>
                  </div>
                  
                  <div className="bg-secondary/30 border border-white/5 rounded-lg p-4 mb-6">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={game.chartData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                          <XAxis dataKey="number" stroke="#999" />
                          <YAxis stroke="#999" />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#222', borderColor: '#444' }}
                            labelStyle={{ color: '#999' }}
                          />
                          <Bar dataKey="frequency" fill="#d4af37" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-black/20 rounded-lg p-6 text-center">
                      <h3 className="text-lg font-semibold text-white mb-3">Most Common</h3>
                      <div className="flex flex-col items-center">
                        <span className="gold-text text-5xl font-bold">
                          {game.chartData.reduce((prev, current) => (prev.frequency > current.frequency) ? prev : current).number}
                        </span>
                        <p className="text-gray-400 mt-2">
                          Appeared {game.chartData.reduce((prev, current) => (prev.frequency > current.frequency) ? prev : current).frequency} times
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-black/20 rounded-lg p-6 text-center">
                      <h3 className="text-lg font-semibold text-white mb-3">Least Common</h3>
                      <div className="flex flex-col items-center">
                        <span className="neon-text-blue text-5xl font-bold">
                          {game.chartData.reduce((prev, current) => (prev.frequency < current.frequency) ? prev : current).number}
                        </span>
                        <p className="text-gray-400 mt-2">
                          Appeared {game.chartData.reduce((prev, current) => (prev.frequency < current.frequency) ? prev : current).frequency} times
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-black/20 rounded-lg p-6 text-center">
                      <h3 className="text-lg font-semibold text-white mb-3">Average Frequency</h3>
                      <div className="flex flex-col items-center">
                        <span className="neon-text-green text-5xl font-bold">
                          {(game.chartData.reduce((acc, curr) => acc + curr.frequency, 0) / game.chartData.length).toFixed(1)}
                        </span>
                        <p className="text-gray-400 mt-2">
                          Across all numbers
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Call to Action */}
            <div className="bg-secondary/30 border border-white/10 rounded-xl p-8 text-center">
              <h2 className="text-2xl font-semibold mb-4 gold-text">Ready to Place Your Bet?</h2>
              <p className="text-gray-400 max-w-2xl mx-auto mb-6">
                Contact us now to place your bet on {game.name}. Our team is available 24/7 to assist you.
              </p>
              <Button 
                onClick={() => setIsContactOpen(true)}
                size="lg"
                className="bg-gold hover:bg-gold-light text-black font-semibold px-8"
              >
                <PhoneCall className="mr-2 h-5 w-5" />
                Contact for Betting
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <ContactPopup isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </MainLayout>
  );
};

export default GameDetail;
