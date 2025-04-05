import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { db } from '@/lib/firebase';
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc
} from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

export interface Result {
  id: string;
  gameId: string;
  date: string;
  value: string;
  timestamp: string;
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

export const GameManagementProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const [results, setResults] = useState<Result[]>([]);
  const [editingResult, setEditingResult] = useState<Result | null>(null);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'games'), (snapshot) => {
      const allResults: Result[] = [];

      snapshot.forEach((docSnap) => {
        const gameId = docSnap.id;
        const data = docSnap.data();
        const resultsArray = data.results || [];

        resultsArray.forEach((result: any, index: number) => {
          allResults.push({
            id: `${gameId}-${result.date}-${result.value}-${index}`,
            gameId,
            date: result.date,
            value: result.value,
            timestamp: result.timestamp || '1970-01-01T00:00:00.000Z'
          });
        });
      });

      // ✅ Sort by timestamp descending
      const sorted = allResults.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setResults(sorted);
    });

    return () => unsub();
  }, []);

  const handleAddResult = async (gameId: string, date: string, value: string) => {
    try {
      if (!gameId || !date || !value) throw new Error('All fields are required.');

      const timestamp = new Date().toISOString();
      const newResult = { date, value, timestamp };
      const gameRef = doc(db, 'games', gameId);

      const currentResults = results
        .filter(r => r.gameId === gameId)
        .map(r => ({ date: r.date, value: r.value, timestamp: r.timestamp }));

      if (editingResult) {
        const updated = currentResults.map(r =>
          r.date === editingResult.date && r.value === editingResult.value
            ? newResult
            : r
        );
        await setDoc(gameRef, { results: updated }, { merge: true });
        toast({ title: 'Updated successfully' });
      } else {
        const exists = currentResults.find(r => r.date === date);
        if (exists) throw new Error('Result already exists for this date.');
        await setDoc(gameRef, { results: [...currentResults, newResult] }, { merge: true });
        toast({ title: 'Added successfully' });
      }

      setEditingResult(null);
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message || 'Something went wrong',
        variant: 'destructive'
      });
    }
  };

  const handleEdit = (result: Result) => {
    setEditingResult(result);
  };

  const handleDelete = async (id: string) => {
    try {
      const toDelete = results.find(r => r.id === id);
      if (!toDelete) return;

      const updatedResults = results
        .filter(r => r.gameId === toDelete.gameId && r.id !== id)
        .map(r => ({ date: r.date, value: r.value, timestamp: r.timestamp }));

      await updateDoc(doc(db, 'games', toDelete.gameId), {
        results: updatedResults
      });

      toast({ title: 'Deleted successfully' });
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to delete result' });
    }
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
        handleClearEditingResult
      }}
    >
      {children}
    </GameManagementContext.Provider>
  );
};

export const useGameManagement = () => {
  const context = useContext(GameManagementContext);
  if (!context) throw new Error('useGameManagement must be used within a GameManagementProvider');
  return context;
};
