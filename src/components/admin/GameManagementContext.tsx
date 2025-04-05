
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useResults } from "@/context/ResultsContext";
import { useToast } from "@/hooks/use-toast";

export interface Result {
  id: string;
  gameId: string;
  date: string;
  value: string;
}

interface GameManagementContextType {
  results: Result[];
  editingResult: Result | null;
  setEditingResult: (result: Result | null) => void;
  handleAddResult: (gameId: string, date: string, value: string) => void;
  handleEdit: (result: Result) => void;
  handleDelete: (id: string) => void;
  handleClearEditingResult: () => void;
}

const GameManagementContext = createContext<GameManagementContextType | undefined>(undefined);

export const GameManagementProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { results: contextResults, addResult } = useResults();
  const { toast } = useToast();
  const [editingResult, setEditingResult] = useState<Result | null>(null);
  
  // Create a flat array of results from the context for display in the table
  const mapContextToResults = () => {
    const flatResults: Result[] = [];
    Object.entries(contextResults).forEach(([gameId, game]) => {
      game.results.forEach(result => {
        flatResults.push({
          id: `${gameId}-${result.date}-${result.value}`, // Creating a unique ID
          gameId,
          date: result.date,
          value: result.value
        });
      });
    });
    return flatResults;
  };
  
  const [results, setResults] = useState<Result[]>(mapContextToResults());
  
  // Update local results when context results change
  useEffect(() => {
    setResults(mapContextToResults());
  }, [contextResults]);

  const handleAddResult = (gameId: string, date: string, value: string) => {
    const newResult = {
      date,
      value,
    };

    if (editingResult) {
      // Update existing result
      const updatedResults = results.map(result => 
        result.id === editingResult.id 
          ? { ...result, gameId, date, value } 
          : result
      );
      setResults(updatedResults);
      toast({
        title: "Success",
        description: "Result updated successfully",
      });
    } else {
      // Add new result to both local state and context
      addResult(gameId, newResult);
      
      // Update local state for the table
      const newResultWithId = {
        id: `${gameId}-${date}-${value}`,
        gameId,
        date,
        value,
      };
      setResults([newResultWithId, ...results]);
      
      toast({
        title: "Success",
        description: "Result added successfully",
      });
    }
  };

  const handleEdit = (result: Result) => {
    setEditingResult(result);
  };

  const handleDelete = (id: string) => {
    setResults(results.filter(result => result.id !== id));
    toast({
      title: "Success",
      description: "Result deleted successfully",
    });
    
    // Note: In a real app, you would also remove from Firebase
    // and the context would automatically update via listeners
  };

  const handleClearEditingResult = () => {
    setEditingResult(null);
  };

  return (
    <GameManagementContext.Provider
      value={{
        results,
        editingResult,
        setEditingResult,
        handleAddResult,
        handleEdit,
        handleDelete,
        handleClearEditingResult,
      }}
    >
      {children}
    </GameManagementContext.Provider>
  );
};

export const useGameManagement = () => {
  const context = useContext(GameManagementContext);
  if (context === undefined) {
    throw new Error('useGameManagement must be used within a GameManagementProvider');
  }
  return context;
};
