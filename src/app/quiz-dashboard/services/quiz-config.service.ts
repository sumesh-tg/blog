import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { QuizConfig } from '../models';
import { addDoc, collection, collectionData, deleteDoc, doc, endBefore, Firestore, getDocs, limit, orderBy, query, startAfter, startAt, updateDoc, where } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class QuizConfigService {
  TEST_CONFIG_COLLECTION_NAME = environment.quizCategoryCollectionName;

  constructor(private firestore: Firestore) { }

  async createTestConfig(quizConfigModel: QuizConfig) {
    const plainObj = { ...quizConfigModel };
    const collRef = collection(this.firestore, this.TEST_CONFIG_COLLECTION_NAME);
    return await addDoc(collRef, plainObj);
  }

  async updateTestConfig(quizConfigModel: QuizConfig) {
    const { id, ...data } = quizConfigModel;
    const docRef = doc(this.firestore, this.TEST_CONFIG_COLLECTION_NAME, String(id));
    return await updateDoc(docRef, data);
  }

  async deleteTestConfig(quizConfigModel: QuizConfig) {
    const collRef = collection(this.firestore, this.TEST_CONFIG_COLLECTION_NAME);
    const q = query(collRef, where('id', '==', quizConfigModel.id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (docSnap) => {
      await deleteDoc(docSnap.ref);
      console.log("deletedd");
    });
  }

  getTestConfigById(id: string) {
    const collRef = collection(this.firestore, this.TEST_CONFIG_COLLECTION_NAME);
    const q = query(collRef, where('id', '==', id));
    return collectionData(q, { idField: 'id' });
  }

  getAllTestConfigs() {
    const collRef = collection(this.firestore, this.TEST_CONFIG_COLLECTION_NAME);
    return collectionData(collRef, { idField: 'id' });
  }
}
