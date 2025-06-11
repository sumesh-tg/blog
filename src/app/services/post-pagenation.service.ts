import { Injectable } from '@angular/core';
import { Firestore, collection, endBefore, getDocs, limit, orderBy, query, startAfter, startAt } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PostPagenationService {
  //Models for Input fields
  nameValue: string = '';
  placeValue: string = '';

  //Data object for listing items
  tableData: any[] = [];

  //Save first document in snapshot of items received
  firstInResponse: any = [];

  //Save last document in snapshot of items received
  lastInResponse: any = [];

  //Keep the array of first document of previous pages
  prev_strt_at: any = [];

  //Maintain the count of clicks on Next Prev button
  pagination_clicked_count = 0;

  //Disable next and prev buttons
  disable_next: boolean = false;
  disable_prev: boolean = false;
  collection_name: string = "posts";

  constructor(private firestore: Firestore) { }
  
  async loadItems(): Promise<any[]> {
    console.log("pagination");
    const postsRef = collection(this.firestore, this.collection_name);
    const q = query(postsRef, orderBy('createdDate', 'desc'), limit(5));
    const response = await getDocs(q);

    if (response.empty) {
      console.log("No Data Available");
      return [];
    }

    this.firstInResponse = response.docs[0];
    this.lastInResponse = response.docs[response.docs.length - 1];

    this.tableData = response.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Initialize values
    this.prev_strt_at = [];
    this.pagination_clicked_count = 0;
    this.disable_next = false;
    this.disable_prev = false;

    // Push first item to use for Previous action
    this.push_prev_startAt(this.firstInResponse);

    return this.tableData;
  }
  async prevPage() {
    this.disable_prev = true;
    const postsRef = collection(this.firestore, this.collection_name);
    const q = query(
      postsRef,
      orderBy('createdDate', 'desc'),
      startAt(this.get_prev_startAt()),
      endBefore(this.firstInResponse!),
      limit(5)
    );
    const response = await getDocs(q);

    if (response.empty) {
      this.disable_prev = false;
      return [];
    }

    this.firstInResponse = response.docs[0];
    this.lastInResponse = response.docs[response.docs.length - 1];
    this.tableData = response.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Maintaining page no.
    this.pagination_clicked_count--;

    // Pop not required value in array
    this.pop_prev_startAt(this.firstInResponse);

    // Enable buttons again
    this.disable_prev = false;
    this.disable_next = false;

    return this.tableData;
  }

   async nextPage(): Promise<any[]> {
    this.disable_next = true;
    const postsRef = collection(this.firestore, this.collection_name);
    const q = query(
      postsRef,
      orderBy('createdDate', 'desc'),
      startAfter(this.lastInResponse!),
      limit(5)
    );
    const response = await getDocs(q);

    if (response.empty) {
      this.disable_next = true;
      return [];
    }

    this.firstInResponse = response.docs[0];
    this.lastInResponse = response.docs[response.docs.length - 1];
    this.tableData = response.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    this.pagination_clicked_count++;
    this.push_prev_startAt(this.firstInResponse);

    this.disable_next = false;
    return this.tableData;
  }

  //Add document
  push_prev_startAt(prev_first_doc:any) {
    this.prev_strt_at.push(prev_first_doc);
  }

  //Remove not required document 
  pop_prev_startAt(prev_first_doc:any) {
    this.prev_strt_at.forEach((element: { data: () => { (): any; new(): any; id: any; }; } | null) => {
      if (element && prev_first_doc.data().id == element.data().id) {
        element = null;
      }
    });
  }

  //Return the Doc rem where previous page will startAt
  get_prev_startAt() {
    if (this.prev_strt_at.length > (this.pagination_clicked_count + 1))
      this.prev_strt_at.splice(this.prev_strt_at.length - 2, this.prev_strt_at.length - 1);
    return this.prev_strt_at[this.pagination_clicked_count - 1];
  }

  //Date formate
  readableDate(time:any) {
    var d = new Date(time);
    return d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
  }

}
