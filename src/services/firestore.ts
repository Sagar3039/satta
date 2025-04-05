import { 
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit as firestoreLimit,
  Timestamp,
  DocumentData
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Types
type GameResult = {
  id?: string;
  gameId: string;
  value: string;
  date: string;
  timestamp: Date;
};

type Game = {
  id: string;
  name: string;
  isLive?: boolean;
  popularity?: number;
};

// Collection References
const gamesCollection = collection(db, 'games');
const resultsCollection = collection(db, 'results');

// Game Operations
export const getGames = async (): Promise<Game[]> => {
  try {
    const snapshot = await getDocs(gamesCollection);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      if (!data.name) {
        throw new Error(`Missing required field 'name' for game ${doc.id}`);
      }
      return { id: doc.id, ...data } as Game;
    });
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error;
  }
};

export const getGame = async (gameId: string): Promise<Game | null> => {
  try {
    if (!gameId) {
      throw new Error('Game ID is required');
    }
    const docRef = doc(gamesCollection, gameId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return null;
    }
    const data = docSnap.data();
    if (!data.name) {
      throw new Error(`Missing required field 'name' for game ${gameId}`);
    }
    return { id: docSnap.id, ...data } as Game;
  } catch (error) {
    console.error('Error fetching game:', error);
    throw error;
  }
};

// Result Operations
export const addResult = async (result: GameResult): Promise<void> => {
  try {
    if (!result.date) {
      throw new Error('Date is required for adding a result');
    }
    const docRef = doc(resultsCollection);
    const timestamp = Timestamp.fromDate(new Date(result.date));
    if (isNaN(timestamp.toDate().getTime())) {
      throw new Error('Invalid date format');
    }
    await setDoc(docRef, {
      ...result,
      timestamp
    });
  } catch (error) {
    console.error('Error adding result:', error);
    throw error;
  }
};

export const updateResult = async (resultId: string, result: Partial<GameResult>): Promise<void> => {
  try {
    if (!resultId) {
      throw new Error('Result ID is required');
    }
    const docRef = doc(resultsCollection, resultId);
    const updateData: Partial<GameResult> & { timestamp?: any } = { ...result };
    if (result.date) {
      const timestamp = Timestamp.fromDate(new Date(result.date));
      if (isNaN(timestamp.toDate().getTime())) {
        throw new Error('Invalid date format');
      }
      updateData.timestamp = timestamp;
    }
    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error('Error updating result:', error);
    throw error;
  }
};

export const deleteResult = async (resultId: string): Promise<void> => {
  try {
    if (!resultId) {
      throw new Error('Result ID is required');
    }
    await deleteDoc(doc(resultsCollection, resultId));
  } catch (error) {
    console.error('Error deleting result:', error);
    throw error;
  }
};

export const getLatestResults = async (limitCount: number = 10): Promise<GameResult[]> => {
  try {
    if (limitCount < 1) {
      throw new Error('Limit must be a positive number');
    }
    const q = query(
      resultsCollection,
      orderBy('timestamp', 'desc'),
      firestoreLimit(limitCount)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      if (!data.timestamp) {
        throw new Error(`Missing timestamp for result ${doc.id}`);
      }
      return {
        id: doc.id,
        ...data,
        timestamp: data.timestamp.toDate()
      } as GameResult;
    });
  } catch (error) {
    console.error('Error fetching latest results:', error);
    throw error;
  }
};

export const getGameResults = async (gameId: string, limitCount: number = 10): Promise<GameResult[]> => {
  try {
    if (!gameId) {
      throw new Error('Game ID is required');
    }
    const q = query(
      resultsCollection,
      where('gameId', '==', gameId),
      orderBy('timestamp', 'desc'),
      firestoreLimit(limitCount)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      if (!data.timestamp) {
        throw new Error(`Missing timestamp for result ${doc.id}`);
      }
      return {
        id: doc.id,
        ...data,
        timestamp: data.timestamp.toDate()
      } as GameResult;
    });
  } catch (error) {
    console.error('Error fetching game results:', error);
    throw error;
  }
};

// Statistics Operations
export const getGameStatistics = async (gameId: string, days: number = 30) => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const q = query(
    resultsCollection,
    where('gameId', '==', gameId),
    where('timestamp', '>=', Timestamp.fromDate(startDate)),
    orderBy('timestamp', 'desc')
  );

  const snapshot = await getDocs(q);
  const results = snapshot.docs.map(doc => doc.data());

  // Calculate frequency
  const frequency: { [key: string]: number } = {};
  results.forEach(result => {
    frequency[result.value] = (frequency[result.value] || 0) + 1;
  });

  return {
    totalResults: results.length,
    frequency,
    mostFrequent: Object.entries(frequency)
      .sort(([, a], [, b]) => b - a)[0],
    leastFrequent: Object.entries(frequency)
      .sort(([, a], [, b]) => a - b)[0]
  };
};
