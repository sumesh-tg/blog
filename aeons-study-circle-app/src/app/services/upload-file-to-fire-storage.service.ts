import { Injectable } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/storage";
import { map, finalize } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UploadFileToFireStorageService {
  selectedFile: File = null;
  fb: string
  downloadURL: Observable<string>;

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
  uploadFileToFireStorage(fileToUpload): Observable<string> {
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
}
