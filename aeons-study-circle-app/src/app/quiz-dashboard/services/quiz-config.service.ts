import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { QuizConfig } from '../models';

@Injectable({
  providedIn: 'root'
})
export class QuizConfigService {
  TEST_CONFIG_COLLECTION_NAME = environment.quizCategoryCollectionName;

  constructor(private firestore: AngularFirestore) { }

  createTestConfig(quizConfigModel: QuizConfig) {
    const plainObj = { ...quizConfigModel };
    return this.firestore.collection(this.TEST_CONFIG_COLLECTION_NAME).add(plainObj);
  }
  updateTestConfig(quizConfigModel: QuizConfig) {
    delete quizConfigModel.id;
    this.firestore.doc(this.TEST_CONFIG_COLLECTION_NAME + '/' + quizConfigModel.id).update(quizConfigModel);
  }
  deleteTestConfig(quizConfigModel: QuizConfig) {
    let deleteDoc = this.firestore.collection(this.TEST_CONFIG_COLLECTION_NAME, ref => ref.where('id', '==', quizConfigModel.id)).snapshotChanges().subscribe(data => {
      data.map(e => {
        this.firestore.collection(this.TEST_CONFIG_COLLECTION_NAME).doc(e.payload.doc.id).delete().then(function () {
          console.log("deletedd");
        }).catch(function (err) {
          console.log("Error while deleting document", err);
        });
      });
    });
  }
  getTestConfigById(id) {
    return this.firestore.collection(this.TEST_CONFIG_COLLECTION_NAME, ref => ref.where('id', '==', id)).snapshotChanges();
  }
}
