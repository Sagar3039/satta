
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
    return contextResults.map(result => ({
      id: result.id || `${result.gameId}-${result.date}-${result.value}`,
      gameId: result.gameId,
      date: result.date,
      value: result.value
    }));
  };
  
  const [results, setResults] = useState<Result[]>(mapContextToResults());
  
  // Update local results when context results change
  useEffect(() => {
    setResults(mapContextToResults());
  }, [contextResults]);

  const handleAddResult = async (gameId: string, date: string, value: string) => {
    try {
      if (editingResult) {
        // Update existing result in Firestore
        await addResult(gameId, date, value);
        // Update local state
        const updatedResults = results.map(result => 
          result.id === editingResult.id 
            ? { ...result, gameId, date, value } 
            : result
        );
        setResults(updatedResults);
      } else {
        // Add new result to Firestore
        await addResult(gameId, date, value);
        
        // Update local state for the table
        const newResultWithId = {
          id: `${gameId}-${date}-${value}`,
          gameId,
          date,
          value,
        };
        setResults([newResultWithId, ...results]);
      }
    } catch (error) {
      console.error('Error adding/updating result:', error);
      toast({
        title: "Error",
        description: "Failed to save result to database",
        variant: "destructive",
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
