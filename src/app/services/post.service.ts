import { Injectable } from '@angular/core';

import { addDoc, collection, collectionData, deleteDoc, doc, endBefore, Firestore, getDocs, limit, orderBy, query, startAfter, startAt, updateDoc, where } from '@angular/fire/firestore';
// Update the import path below if the actual path is different
import { environment } from '../../environments/environment';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  POST_COLLECTION_NAME = environment.postCollectionsName;
  constructor(private firestore: Firestore) { }
  getPosts() {
    const postsRef = collection(this.firestore, this.POST_COLLECTION_NAME);
    const q = query(postsRef, orderBy('createdDate', 'desc'), limit(5));
    return collectionData(q, { idField: 'id' });
  }
 nextPage(lastInResponse: any) {
    const postsRef = collection(this.firestore, this.POST_COLLECTION_NAME);
    const q = query(
      postsRef,
      orderBy('createdDate', 'desc'),
      startAfter(lastInResponse),
      limit(5)
    );
    return collectionData(q, { idField: 'id' });
  }
  prevPage(firstInResponse: any, startAtValue: any) {
    const postsRef = collection(this.firestore, this.POST_COLLECTION_NAME);
    const q = query(
      postsRef,
      orderBy('createdDate', 'desc'),
      startAt(startAtValue),
      endBefore(firstInResponse),
      limit(5)
    );
    return collectionData(q, { idField: 'id' });
  }
 createPost(post: Post) {
    const postsRef = collection(this.firestore, this.POST_COLLECTION_NAME);
    return addDoc(postsRef, post);
  }
  updatePost(postModel: Post) {
    if (!postModel.id) throw new Error('Post id is required for update');
    const postDocRef = doc(this.firestore, this.POST_COLLECTION_NAME + '/' + postModel.id);
    const { id, ...postData } = postModel;
    return updateDoc(postDocRef, postData);
  }
  async deletePost(postModel: Post) {
    // Find the document with the matching id field and delete it
    const postsRef = collection(this.firestore, this.POST_COLLECTION_NAME);
    const q = query(postsRef, where('id', '==', postModel.id));
    const querySnapshot = await getDocs(q);
    for (const docSnap of querySnapshot.docs) {
      await deleteDoc(docSnap.ref);
    }
  }
  getPostById(id: any) {
    const postsRef = collection(this.firestore, this.POST_COLLECTION_NAME);
    const q = query(postsRef, where('id', '==', id));
    return collectionData(q, { idField: 'id' });
  }
}
