
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, Edit, Plus, Trash2 } from "lucide-react";

// Mock games (in a real app, this would come from Firebase)
const GAMES = [
  { id: "delhi-bazar", name: "Delhi Bazar" },
  { id: "shree-ganes", name: "Shree Ganes" },
  { id: "faridabad", name: "Faridabad" },
  { id: "lucky-seven", name: "Lucky Seven" },
  { id: "gaziyabad", name: "Gaziyabad" },
  { id: "gali", name: "Gali" },
  { id: "desawar", name: "Desawar" },
];

// Mock scheduled results
const initialScheduled = [
  { id: "1", gameId: "delhi-bazar", date: "05 April, 2025", time: "14:00", value: "78" },
  { id: "2", gameId: "shree-ganes", date: "05 April, 2025", time: "15:30", value: "45" },
  { id: "3", gameId: "faridabad", date: "05 April, 2025", time: "17:00", value: "92" },
];

const ScheduleResults = () => {
  const [scheduled, setScheduled] = useState(initialScheduled);
  const [selectedGame, setSelectedGame] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [value, setValue] = useState("");
  const [editingSchedule, setEditingSchedule] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAddSchedule = () => {
    if (!selectedGame || !date || !time || !value) {
      toast({
        title: "Error",
        description: "Please fill all fields",
        variant: "destructive",
      });
      return;
    }

    if (editingSchedule) {
      // Update existing schedule
      const updatedSchedules = scheduled.map(schedule => 
        schedule.id === editingSchedule 
          ? { ...schedule, gameId: selectedGame, date, time, value } 
          : schedule
      );
      setScheduled(updatedSchedules);
      toast({
        title: "Success",
        description: "Schedule updated successfully",
      });
    } else {
      // Add new schedule
      const newSchedule = {
        id: Date.now().toString(),
        gameId: selectedGame,
        date,
        time,
        value,
      };
      setScheduled([newSchedule, ...scheduled]);
      toast({
        title: "Success",
        description: "Result scheduled successfully",
      });
    }

    // Reset form
    setSelectedGame("");
    setDate("");
    setTime("");
    setValue("");
    setEditingSchedule(null);
  };

  const handleEdit = (schedule) => {
    setSelectedGame(schedule.gameId);
    setDate(schedule.date);
    setTime(schedule.time);
    setValue(schedule.value);
    setEditingSchedule(schedule.id);
  };

  const handleDelete = (id) => {
    setScheduled(scheduled.filter(schedule => schedule.id !== id));
    toast({
      title: "Success",
      description: "Scheduled result deleted successfully",
    });
  };

  const getGameName = (gameId) => {
    const game = GAMES.find(g => g.id === gameId);
    return game ? game.name : gameId;
  };

  return (
    <div className="space-y-8">
      <Card className="bg-black/40 border border-white/10">
        <CardHeader>
          <CardTitle>
            {editingSchedule ? "Edit Scheduled Result" : "Schedule New Result"}
          </CardTitle>
          <CardDescription>
            {editingSchedule 
              ? "Update the scheduled game result" 
              : "Schedule a game result to be published automatically"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-white mb-2">Game</label>
              <Select value={selectedGame} onValueChange={setSelectedGame}>
                <SelectTrigger className="bg-black/60 border-white/20">
                  <SelectValue placeholder="Select Game" />
                </SelectTrigger>
                <SelectContent>
                  {GAMES.map(game => (
                    <SelectItem key={game.id} value={game.id}>
                      {game.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-white mb-2">Date</label>
              <div className="relative">
                <Input
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="DD Month, YYYY"
                  className="bg-black/60 border-white/20 pl-10"
                />
                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div>
              <label className="block text-white mb-2">Time</label>
              <div className="relative">
                <Input
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="HH:MM"
                  className="bg-black/60 border-white/20 pl-10"
                />
                <Clock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div>
              <label className="block text-white mb-2">Result Value</label>
              <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="e.g. 34"
                className="bg-black/60 border-white/20"
              />
            </div>
            
            <div className="flex items-end">
              <Button 
                onClick={handleAddSchedule}
                className="bg-gold hover:bg-gold/80 text-black w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                {editingSchedule ? "Update Schedule" : "Schedule Result"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-black/40 border border-white/10">
        <CardHeader>
          <CardTitle>Upcoming Scheduled Results</CardTitle>
          <CardDescription>
            View and manage scheduled game results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-black/30">
                <TableHead className="text-white font-semibold">Game</TableHead>
                <TableHead className="text-white font-semibold">Date</TableHead>
                <TableHead className="text-white font-semibold">Time</TableHead>
                <TableHead className="text-white font-semibold">Result</TableHead>
                <TableHead className="text-white font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scheduled.map((schedule) => (
                <TableRow key={schedule.id} className="border-b border-white/10">
                  <TableCell className="text-gray-400">{getGameName(schedule.gameId)}</TableCell>
                  <TableCell className="text-gray-400">{schedule.date}</TableCell>
                  <TableCell className="text-gray-400">{schedule.time}</TableCell>
                  <TableCell>
                    <span className="text-gold font-semibold">{schedule.value}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEdit(schedule)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDelete(schedule.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleResults;
