import { Injectable } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { map, finalize, tap } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UploadFileToFireStorageService {
  selectedFile: File | null = null;
  fb: string = ''
  downloadURL!: Observable<string>;
  task: any;
  uploadState!: Observable<string>;

  percentage!: Observable<number>;
  snapshot!: Observable<any>;
  downloadURL2!: string;

  constructor(private storage: AngularFireStorage) { }
  uploadFileSelected(event:any) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `aeons-assets/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`aeons-assets/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      ).subscribe();
  }
  uploadFileToFireStorageOllldddddddddddddddddddddddddddddddd(fileToUpload:any): Observable<string> {
    var n = Date.now();
    const file = fileToUpload;
    const filePath = `aeons-assets/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`aeons-assets/${n}`, file);
    let downloadURL$: Observable<string>;
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          downloadURL$ = fileRef.getDownloadURL();
          downloadURL$.subscribe(url => {
            if (url) {
              this.fb = url;
            }
          });
        })
      ).subscribe();
    // Return the observable that will emit the download URL when available
    return fileRef.getDownloadURL();
  }
  async uploadFileToFireStorage(fileToUpload:any): Promise<Observable<String>> {
    var n = Date.now();
    const file = fileToUpload;
    const filePath = `aeons-assets/${n}`;
    const fileRef = this.storage.ref(filePath);
    this.task = this.storage.upload(`aeons-assets/${n}`, file);
    this.percentage = this.task.percentageChanges();
    this.downloadURL2 = (await this.task).downloadURL;
    this.uploadState = this.task.snapshotChanges().pipe(map((s: any) => s.state));
    this.snapshot = this.task.snapshotChanges()
      .pipe(tap(console.log),
        finalize(async () => {
          this.downloadURL = await fileRef.getDownloadURL().toPromise();
          console.log("", this.downloadURL);
          return await fileRef.getDownloadURL().toPromise();
        })
      );
    return await fileRef.getDownloadURL().toPromise();
  }
  deleteFileUsingUrl(url:any) {
    const fileRef = this.storage.storage.refFromURL(url);
    fileRef.delete().then(data => {
      console.log("Image deleted");
    });
  }
}
