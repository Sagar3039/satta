
import { useState } from 'react';
import MainLayout from "@/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import ResultTable from "@/components/ResultTable";

// Mock data - extended with more dates
const extendedResults = {
  "delhi-bazar": {
    name: "Delhi Bazar",
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
    ]
  },
  "shree-ganes": {
    name: "Shree Ganes",
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
    ]
  },
  "faridabad": {
    name: "Faridabad",
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
    ]
  },
  "lucky-seven": {
    name: "Lucky Seven",
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
    ]
  },
  "gaziyabad": {
    name: "Gaziyabad",
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
    ]
  },
  "gali": {
    name: "Gali",
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
    ]
  },
  "desawar": {
    name: "Desawar",
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
    ]
  },
};

// List of months for the filter
const months = [
  "April 2025", "March 2025", "February 2025", "January 2025", 
  "December 2024", "November 2024", "October 2024", "September 2024"
];

const Results = () => {
  const [selectedMonth, setSelectedMonth] = useState("April 2025");

  return (
    <MainLayout>
      <section className="py-24 relative">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black z-0"></div>
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">
                <span className="gold-text">Game Results</span>
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Check the latest results for all our Satta King games. Filter by month to see historical data.
              </p>
            </div>
            
            <div className="mb-10 max-w-xs mx-auto">
              <Label htmlFor="month-select" className="text-white mb-2 block">Select Month</Label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="bg-secondary/30 border-white/10">
                  <SelectValue placeholder="Select Month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month} value={month}>{month}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="bg-secondary/20 rounded-xl p-6 md:p-8 border border-white/5">
              <Tabs defaultValue="delhi-bazar" className="w-full">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8 bg-black/20">
                  <TabsTrigger value="delhi-bazar" className="data-[state=active]:bg-gold data-[state=active]:text-black">Delhi Bazar</TabsTrigger>
                  <TabsTrigger value="shree-ganes" className="data-[state=active]:bg-gold data-[state=active]:text-black">Shree Ganes</TabsTrigger>
                  <TabsTrigger value="faridabad" className="data-[state=active]:bg-gold data-[state=active]:text-black">Faridabad</TabsTrigger>
                  <TabsTrigger value="lucky-seven" className="data-[state=active]:bg-gold data-[state=active]:text-black">Lucky Seven</TabsTrigger>
                  <TabsTrigger value="gaziyabad" className="data-[state=active]:bg-gold data-[state=active]:text-black">Gaziyabad</TabsTrigger>
                  <TabsTrigger value="gali" className="data-[state=active]:bg-gold data-[state=active]:text-black">Gali</TabsTrigger>
                  <TabsTrigger value="desawar" className="data-[state=active]:bg-gold data-[state=active]:text-black">Desawar</TabsTrigger>
                </TabsList>
                
                {Object.entries(extendedResults).map(([gameId, game]) => (
                  <TabsContent key={gameId} value={gameId}>
                    <div className="p-4 bg-black/10 rounded-lg mb-6">
                      <h2 className="text-2xl font-semibold text-white">
                        {game.name} <span className="text-gray-400">Results</span>
                      </h2>
                      <p className="text-gray-400">
                        Showing results for {selectedMonth}
                      </p>
                    </div>
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
        </div>
      </section>
    </MainLayout>
  );
};

export default Results;
