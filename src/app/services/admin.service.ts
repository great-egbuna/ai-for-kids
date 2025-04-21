import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";

export interface WaitlistSubscriber {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  type: string;
}
export interface SiteContent {
  heroTitle: string;
  aboutContent: string;
}

class GeneralService {
  async getWaitlistSubscribers(): Promise<WaitlistSubscriber[] | Error> {
    try {
      const querySnapshot = await getDocs(collection(db, "subscribers"));
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as WaitlistSubscriber[];
    } catch (error: any) {
      return new Error(error?.message);
    }
  }

  async getSiteContent(): Promise<SiteContent | Error> {
    try {
      const docRef = doc(db, "siteContent", "main");
      const docSnap = await getDoc(docRef);
      return docSnap.data() as SiteContent;
    } catch (error: any) {
      return new Error(error?.message);
    }
  }

  async updateSiteContent(content: SiteContent): Promise<Error | string> {
    try {
      const docRef = doc(db, "siteContent", "main");
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        // Create document if it doesn't exist
        await setDoc(docRef, content);
      } else {
        // Update existing document
        await updateDoc(docRef, content as any);
      }

      return "success";
    } catch (error: any) {
      console.error("Error updating site content:", error);
      return new Error(error?.message || "Failed to update site content");
    }
  }
}

export const generalService = new GeneralService();
