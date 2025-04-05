
// 2. firebaseUtils.js - For interacting with Firebase

import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const STATS_DOC = "statistics/data";

export const fetchStatistics = async () => {
  try {
    const docRef = doc(db, STATS_DOC);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching stats:", error);
    return null;
  }
};

export const updateStatistics = async (newStats) => {
  try {
    const docRef = doc(db, STATS_DOC);
    await setDoc(docRef, newStats, { merge: true });
    return true;
  } catch (error) {
    console.error("Error updating stats:", error);
    return false;
  }
};

