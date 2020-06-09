import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Post } from 'src/app/models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private firestore: AngularFirestore) { }
  getPosts() {
    return this.firestore.collection('posts', ref => ref
      .limit(5)
      .orderBy('createdDate', 'desc')).snapshotChanges();
  }
  nextPage(lastInResponse) {
    return this.firestore.collection('posts', ref => ref
      .limit(5)
      .orderBy('createdDate', 'desc')
      .startAfter(lastInResponse)).snapshotChanges();
  }
  prevPage(firstInResponse, startAt) {
    return this.firestore.collection('posts', ref => ref
      .limit(5)
      .orderBy('createdDate', 'desc')
      .startAt(startAt)
      .endBefore(firstInResponse)).snapshotChanges();
  }
  createPost(post: Post) {
    return this.firestore.collection('posts').add(post);
  }
  updatePost(postModel: Post) {
    delete postModel.id;
    this.firestore.doc('posts/' + postModel.id).update(postModel);
  }
  deletePost(postModel: Post) {
    this.firestore.doc('posts/' + postModel.id).delete();
  }
  getPostById(id) {
    return this.firestore.collection('posts', ref => ref.where('id', '==', id)).snapshotChanges();
  }
}
