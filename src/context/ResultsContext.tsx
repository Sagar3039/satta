
import { createContext, useContext, useState, useEffect } from 'react';
import { getLatestResults, addResult as addFirestoreResult, updateResult as updateFirestoreResult, deleteResult as deleteFirestoreResult } from '@/services/firestore';
import { useToast } from '@/hooks/use-toast';

type Result = {
  id?: string;
  gameId: string;
  value: string;
  date: string;
  timestamp?: Date;
};

type ResultsContextType = {
  results: Result[];
  loading: boolean;
  addResult: (gameId: string, date: string, value: string) => Promise<void>;
  updateResult: (id: string, gameId: string, date: string, value: string) => Promise<void>;
  deleteResult: (id: string) => Promise<void>;
};

const ResultsContext = createContext<ResultsContextType | null>(null);

export const ResultsProvider = ({ children }: { children: React.ReactNode }) => {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const latestResults = await getLatestResults(10);
        setResults(latestResults);
      } catch (error) {
        console.error('Error fetching results:', error);
        toast({
          title: 'Error',
          description: 'Failed to load results',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [toast]);

  const addResult = async (gameId: string, date: string, value: string) => {
    try {
      await addFirestoreResult({ gameId, date, value, timestamp: new Date(date) });
      const latestResults = await getLatestResults(10);
      setResults(latestResults);
      toast({
        title: 'Success',
        description: 'Result added successfully',
      });
    } catch (error) {
      console.error('Error adding result:', error);
      toast({
        title: 'Error',
        description: 'Failed to add result',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const updateResult = async (id: string, gameId: string, date: string, value: string) => {
    try {
      await updateFirestoreResult(id, { gameId, date, value });
      const latestResults = await getLatestResults(10);
      setResults(latestResults);
      toast({
        title: 'Success',
        description: 'Result updated successfully',
      });
    } catch (error) {
      console.error('Error updating result:', error);
      toast({
        title: 'Error',
        description: 'Failed to update result',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const deleteResult = async (id: string) => {
    try {
      await deleteFirestoreResult(id);
      const latestResults = await getLatestResults(10);
      setResults(latestResults);
      toast({
        title: 'Success',
        description: 'Result deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting result:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete result',
        variant: 'destructive',
      });
      throw error;
    }
  };

  return (
    <ResultsContext.Provider value={{ results, loading, addResult, updateResult, deleteResult }}>
      {children}
    </ResultsContext.Provider>
  );
};

export const useResults = () => {
  const context = useContext(ResultsContext);
  if (!context) {
    throw new Error('useResults must be used within a ResultsProvider');
  }
  return context;
};
