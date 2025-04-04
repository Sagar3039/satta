
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, FileText } from "lucide-react";

// Mock games
const GAMES = [
  { id: "delhi-bazar", name: "Delhi Bazar" },
  { id: "shree-ganes", name: "Shree Ganes" },
  { id: "faridabad", name: "Faridabad" },
  { id: "lucky-seven", name: "Lucky Seven" },
  { id: "gaziyabad", name: "Gaziyabad" },
  { id: "gali", name: "Gali" },
  { id: "desawar", name: "Desawar" },
];

// Mock statistics data
const frequencyData = [
  { number: "01", frequency: 7, lastSeen: "28 Mar, 2025" },
  { number: "23", frequency: 12, lastSeen: "02 Apr, 2025" },
  { number: "45", frequency: 9, lastSeen: "31 Mar, 2025" },
  { number: "67", frequency: 5, lastSeen: "23 Mar, 2025" },
  { number: "89", frequency: 8, lastSeen: "29 Mar, 2025" },
  { number: "00", frequency: 4, lastSeen: "15 Mar, 2025" },
  { number: "12", frequency: 6, lastSeen: "30 Mar, 2025" },
  { number: "34", frequency: 11, lastSeen: "04 Apr, 2025" },
  { number: "56", frequency: 3, lastSeen: "18 Mar, 2025" },
  { number: "78", frequency: 7, lastSeen: "27 Mar, 2025" },
];

const Statistics = () => {
  const [selectedGame, setSelectedGame] = useState("all");
  const [timeRange, setTimeRange] = useState("30days");
  
  return (
    <div className="space-y-8">
      <Card className="bg-black/40 border border-white/10">
        <CardHeader>
          <CardTitle>Game Statistics</CardTitle>
          <CardDescription>
            Analyze historical game data and patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-white mb-2">Select Game</label>
              <Select value={selectedGame} onValueChange={setSelectedGame}>
                <SelectTrigger className="bg-black/60 border-white/20">
                  <SelectValue placeholder="Select Game" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Games</SelectItem>
                  {GAMES.map(game => (
                    <SelectItem key={game.id} value={game.id}>
                      {game.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-white mb-2">Time Range</label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="bg-black/60 border-white/20">
                  <SelectValue placeholder="Select Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="90days">Last 90 Days</SelectItem>
                  <SelectItem value="year">Last Year</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="bg-black/60 border border-white/10">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-gray-400">Most Frequent Number</p>
                  <h3 className="text-3xl font-bold gold-text">23</h3>
                  <p className="text-sm text-gray-400">Appeared 12 times</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/60 border border-white/10">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-gray-400">Total Results</p>
                  <h3 className="text-3xl font-bold text-white">214</h3>
                  <p className="text-sm text-gray-400">In selected timeframe</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/60 border border-white/10">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-gray-400">Least Frequent Number</p>
                  <h3 className="text-3xl font-bold text-red-400">56</h3>
                  <p className="text-sm text-gray-400">Appeared 3 times</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Number Frequency Analysis</h3>
            <Table>
              <TableHeader>
                <TableRow className="bg-black/30">
                  <TableHead className="text-white font-semibold">Number</TableHead>
                  <TableHead className="text-white font-semibold">Frequency</TableHead>
                  <TableHead className="text-white font-semibold">Last Appeared</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {frequencyData.map((item) => (
                  <TableRow key={item.number} className="border-b border-white/10">
                    <TableCell>
                      <span className="text-gold font-semibold">{item.number}</span>
                    </TableCell>
                    <TableCell className="text-gray-400">{item.frequency} times</TableCell>
                    <TableCell className="text-gray-400">{item.lastSeen}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-white/10 pt-6">
          <div className="text-sm text-gray-400">
            Data source: Historical game results
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-white/20">
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
            <Button className="bg-gold hover:bg-gold/80 text-black">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Statistics;
