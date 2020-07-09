import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from "@angular/fire/storage";
import { map, finalize, tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class UploadFileToFireStorageService {
  selectedFile: File = null;
  fb: string
  downloadURL: Observable<string>;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL2: string;

  constructor(private storage: AngularFireStorage) { }
  uploadFileSelected(event) {
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
      ).subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }
  uploadFileToFireStorageOllldddddddddddddddddddddddddddddddd(fileToUpload): Observable<string> {
    var n = Date.now();
    const file = fileToUpload;
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
            return this.downloadURL;
          });
        })
      ).subscribe(url => {
        if (url) {
          console.log(url);
          return this.downloadURL;
        }
      });
    return this.downloadURL;
  }
  async uploadFileToFireStorage(fileToUpload): Promise<Observable<String>> {
    var n = Date.now();
    const file = fileToUpload;
    const filePath = `aeons-assets/${n}`;
    const fileRef = this.storage.ref(filePath);
    this.task = this.storage.upload(`aeons-assets/${n}`, file);
    this.percentage = this.task.percentageChanges();
    this.downloadURL2 = (await this.task).downloadURL;
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
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
  deleteFileUsingUrl(url) {
    const fileRef = this.storage.storage.refFromURL(url);
    fileRef.delete().then(data => {
      console.log("Image deleted");
    });
  }
}
