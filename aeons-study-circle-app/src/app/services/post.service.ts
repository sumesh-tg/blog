import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Post } from 'src/app/models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  POST_COLLECTION_NAME = "posts";
  constructor(private firestore: AngularFirestore) { }
  getPosts() {
    return this.firestore.collection(this.POST_COLLECTION_NAME, ref => ref
      .limit(5)
      .orderBy('createdDate', 'desc')).snapshotChanges();
  }
  nextPage(lastInResponse) {
    return this.firestore.collection(this.POST_COLLECTION_NAME, ref => ref
      .limit(5)
      .orderBy('createdDate', 'desc')
      .startAfter(lastInResponse)).snapshotChanges();
  }
  prevPage(firstInResponse, startAt) {
    return this.firestore.collection(this.POST_COLLECTION_NAME, ref => ref
      .limit(5)
      .orderBy('createdDate', 'desc')
      .startAt(startAt)
      .endBefore(firstInResponse)).snapshotChanges();
  }
  createPost(post: Post) {
    return this.firestore.collection(this.POST_COLLECTION_NAME).add(post);
  }
  updatePost(postModel: Post) {
    delete postModel.id;
    this.firestore.doc(this.POST_COLLECTION_NAME + '/' + postModel.id).update(postModel);
  }
  deletePost(postModel: Post) {
    // return this.firestore.collection('posts').doc(postModel.id).delete().then(function() {
    //   console.log("Document successfully deleted!");
    // })
    // .catch(function(error) {
    //   console.error("Error removing document: ", error);
    // });
    let deleteDoc = this.firestore.collection(this.POST_COLLECTION_NAME, ref => ref.where('id', '==', postModel.id)).snapshotChanges().subscribe(data => {
      data.map(e => {
        this.firestore.collection(this.POST_COLLECTION_NAME).doc(e.payload.doc.id).delete().then(function () {
          console.log("deletedd");
        }).catch(function (err) {
          console.log("Error while deleting document", err);
        });
      });
    });
  }
  getPostById(id) {
    return this.firestore.collection(this.POST_COLLECTION_NAME, ref => ref.where('id', '==', id)).snapshotChanges();
  }
}
