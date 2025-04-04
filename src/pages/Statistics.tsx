
import { useState } from 'react';
import MainLayout from "@/layout/MainLayout";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

// Mock data for statistics
const mockChartData = {
  "delhi-bazar": [
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
  "shree-ganes": [
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
  "faridabad": [
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
};

const hotColdData = {
  "delhi-bazar": [
    { name: 'Hot (>8)', value: 35 },
    { name: 'Warm (5-8)', value: 45 },
    { name: 'Cold (<5)', value: 20 },
  ],
  "shree-ganes": [
    { name: 'Hot (>8)', value: 40 },
    { name: 'Warm (5-8)', value: 40 },
    { name: 'Cold (<5)', value: 20 },
  ],
  "faridabad": [
    { name: 'Hot (>8)', value: 30 },
    { name: 'Warm (5-8)', value: 50 },
    { name: 'Cold (<5)', value: 20 },
  ],
};

const timeframeOptions = ["Last Week", "Last Month", "Last 3 Months", "Last 6 Months", "Last Year"];
const COLORS = ['#FF8042', '#FFBB28', '#00C49F'];

const Statistics = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("Last Month");

  return (
    <MainLayout>
      <section className="py-24 relative">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black z-0"></div>
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">
                <span className="gold-text">Game Statistics</span>
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Analyze historical data and trends to make informed betting decisions.
              </p>
            </div>
            
            <div className="mb-10 max-w-xs mx-auto">
              <Label htmlFor="timeframe-select" className="text-white mb-2 block">Select Timeframe</Label>
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="bg-secondary/30 border-white/10">
                  <SelectValue placeholder="Select Timeframe" />
                </SelectTrigger>
                <SelectContent>
                  {timeframeOptions.map((timeframe) => (
                    <SelectItem key={timeframe} value={timeframe}>{timeframe}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="bg-secondary/20 rounded-xl p-6 md:p-8 border border-white/5">
              <Tabs defaultValue="delhi-bazar" className="w-full">
                <TabsList className="grid grid-cols-3 mb-8 bg-black/20">
                  <TabsTrigger value="delhi-bazar" className="data-[state=active]:bg-gold data-[state=active]:text-black">Delhi Bazar</TabsTrigger>
                  <TabsTrigger value="shree-ganes" className="data-[state=active]:bg-gold data-[state=active]:text-black">Shree Ganes</TabsTrigger>
                  <TabsTrigger value="faridabad" className="data-[state=active]:bg-gold data-[state=active]:text-black">Faridabad</TabsTrigger>
                </TabsList>
                
                {Object.keys(mockChartData).map((gameId) => (
                  <TabsContent key={gameId} value={gameId}>
                    <div className="p-4 bg-black/10 rounded-lg mb-6">
                      <h2 className="text-2xl font-semibold text-white capitalize">
                        {gameId.split('-').join(' ')} <span className="text-gray-400">Statistics</span>
                      </h2>
                      <p className="text-gray-400">
                        Showing data for {selectedTimeframe}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                      <Card className="bg-secondary/30 border border-white/5">
                        <CardHeader>
                          <h3 className="text-xl font-semibold text-white">Number Frequency</h3>
                        </CardHeader>
                        <CardContent>
                          <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart
                                data={mockChartData[gameId]}
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
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-secondary/30 border border-white/5">
                        <CardHeader>
                          <h3 className="text-xl font-semibold text-white">Number Distribution</h3>
                        </CardHeader>
                        <CardContent>
                          <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={hotColdData[gameId]}
                                  cx="50%"
                                  cy="50%"
                                  labelLine={false}
                                  outerRadius={100}
                                  fill="#8884d8"
                                  dataKey="value"
                                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                  {hotColdData[gameId].map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                  ))}
                                </Pie>
                                <Tooltip 
                                  contentStyle={{ backgroundColor: '#222', borderColor: '#444' }}
                                  labelStyle={{ color: '#999' }}
                                />
                                <Legend />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card className="bg-secondary/30 border border-white/5">
                        <CardContent className="pt-6">
                          <h3 className="text-xl font-semibold text-white mb-2">Most Frequent</h3>
                          <div className="flex items-center justify-center py-4">
                            <span className="gold-text text-5xl font-bold">3</span>
                          </div>
                          <p className="text-gray-400 text-center">Appeared 12 times</p>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-secondary/30 border border-white/5">
                        <CardContent className="pt-6">
                          <h3 className="text-xl font-semibold text-white mb-2">Least Frequent</h3>
                          <div className="flex items-center justify-center py-4">
                            <span className="neon-text-blue text-5xl font-bold">8</span>
                          </div>
                          <p className="text-gray-400 text-center">Appeared 3 times</p>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-secondary/30 border border-white/5">
                        <CardContent className="pt-6">
                          <h3 className="text-xl font-semibold text-white mb-2">Average Value</h3>
                          <div className="flex items-center justify-center py-4">
                            <span className="neon-text-green text-5xl font-bold">4.7</span>
                          </div>
                          <p className="text-gray-400 text-center">Based on recent results</p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Statistics;
