// context/ResultsContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { db } from '@/lib/firebase';
import { onSnapshot, doc, collection, setDoc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

interface Result {
  date: string;
  value: string;
}

interface GameData {
  name: string;
  results: Result[];
}

interface ResultsContextType {
  results: Record<string, GameData>;
  addResult: (gameId: string, result: Result) => Promise<void>;
}

const ResultsContext = createContext<ResultsContextType | undefined>(undefined);

export const ResultsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [results, setResults] = useState<Record<string, GameData>>({});

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'games'), (snapshot) => {
      const data: Record<string, GameData> = {};

      // Game names mapping
      const gameNames: Record<string, string> = {
        "delhi-bazar": "Delhi Bazar",
        "shree-ganes": "Shree Ganes",
        "faridabad": "Faridabad",
        "lucky-seven": "Lucky Seven",
        "ghaziabad": "Ghaziabad",
        "desawar": "Desawar",
        "gali": "Gali",
      };

      snapshot.forEach((docSnap) => {
        const docData = docSnap.data();
        const gameId = docSnap.id;

        data[gameId] = {
          name: gameNames[gameId] || gameId,
          results: docData.results || [],
        };
      });

      setResults(data);
    });

    return () => unsubscribe();
  }, []);

  const addResult = async (gameId: string, result: Result) => {
    const gameRef = doc(db, 'games', gameId);

    const gameDoc = await getDoc(gameRef);
    if (gameDoc.exists()) {
      await updateDoc(gameRef, {
        results: arrayUnion(result),
      });
    } else {
      await setDoc(gameRef, {
        results: [result],
      });
    }
  };

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
