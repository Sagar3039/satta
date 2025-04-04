
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Calendar, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useGameManagement } from "./GameManagementContext";

// Mock game data (in a real app, this would come from Firebase)
export const GAMES = [
  { id: "delhi-bazar", name: "Delhi Bazar" },
  { id: "shree-ganes", name: "Shree Ganes" },
  { id: "faridabad", name: "Faridabad" },
  { id: "lucky-seven", name: "Lucky Seven" },
  { id: "gaziyabad", name: "Gaziyabad" },
  { id: "gali", name: "Gali" },
  { id: "desawar", name: "Desawar" },
];

const ResultForm = () => {
  const [selectedGame, setSelectedGame] = useState("");
  const [date, setDate] = useState("");
  const [value, setValue] = useState("");
  const { toast } = useToast();
  const { editingResult, handleAddResult, handleClearEditingResult } = useGameManagement();

  // Set form values when editing a result
  useEffect(() => {
    if (editingResult) {
      setSelectedGame(editingResult.gameId);
      setDate(editingResult.date);
      setValue(editingResult.value);
    }
  }, [editingResult]);

  const handleSubmit = () => {
    if (!selectedGame || !date || !value) {
      toast({
        title: "Error",
        description: "Please fill all fields",
        variant: "destructive",
      });
      return;
    }

    handleAddResult(selectedGame, date, value);
    
    // Reset form
    setSelectedGame("");
    setDate("");
    setValue("");
    handleClearEditingResult();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
          onClick={handleSubmit}
          className="bg-gold hover:bg-gold/80 text-black w-full"
        >
          <Plus className="mr-2 h-4 w-4" />
          {editingResult ? "Update Result" : "Add Result"}
        </Button>
      </div>
    </div>
  );
};

export default ResultForm;
