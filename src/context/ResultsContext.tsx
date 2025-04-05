
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Mock data - in a real app, this would come from Firebase
const initialResults = {
  "delhi-bazar": {
    name: "Delhi Bazar",
    results: [
      { date: "04 April, 2025", value: "34" },
      { date: "03 April, 2025", value: "52" },
      { date: "02 April, 2025", value: "78" },
      { date: "01 April, 2025", value: "19" },
      { date: "31 March, 2025", value: "45" },
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
    ]
  },
};

interface Result {
  date: string;
  value: string;
}

interface GameResults {
  name: string;
  results: Result[];
}

interface ResultsContextType {
  results: Record<string, GameResults>;
  addResult: (gameId: string, newResult: Result) => void;
}

const ResultsContext = createContext<ResultsContextType | undefined>(undefined);

export const ResultsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [results, setResults] = useState<Record<string, GameResults>>(initialResults);

  const addResult = (gameId: string, newResult: Result) => {
    setResults(prev => {
      // If game exists, add to its results
      if (prev[gameId]) {
        // Create a new array with the new result at the beginning
        const updatedResults = [newResult, ...prev[gameId].results];
        
        return {
          ...prev,
          [gameId]: {
            ...prev[gameId],
            results: updatedResults
          }
        };
      }
      
      // If game doesn't exist yet (unlikely in this mock setup)
      return prev;
    });
  };

  // In a real Firebase app, you would set up listeners here
  // For example:
  // useEffect(() => {
  //   const unsubscribe = onSnapshot(collection(db, "results"), (snapshot) => {
  //     // Update results based on firebase data
  //   });
  //   return () => unsubscribe();
  // }, []);

  return (
    <ResultsContext.Provider value={{ results, addResult }}>
      {children}
    </ResultsContext.Provider>
  );
};

export const useResults = () => {
  const context = useContext(ResultsContext);
  if (context === undefined) {
    throw new Error('useResults must be used within a ResultsProvider');
  }
  return context;
};
