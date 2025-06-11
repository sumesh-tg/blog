import { Component, OnInit } from '@angular/core';
import { PostService } from 'app/services/post.service';
import { Post } from 'app/models/post.model';
import { ToastrService } from 'ngx-toastr';
import { UploadFileToFireStorageService } from 'app/services/upload-file-to-fire-storage.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.scss'],
  imports: [FormsModule, CommonModule],
})
export class DeletePostComponent implements OnInit {
  postsArray: Post[] = [];

  constructor(private postService: PostService,private toastr: ToastrService,private uploadFileToFireStorageService :UploadFileToFireStorageService) { }

  ngOnInit(): void {
    interface FirestoreDocument {
      payload: {
      doc: {
        data(): unknown;
        id: string;
      };
      };
    }

    this.postService.getPosts().subscribe((posts: any[]) => {
      this.postsArray = posts.map((e: any) => {
        const data = e.payload.doc.data();
        let id: string = e.payload.doc.id;
        return { id, ...(data as Object), selected: false } as Post; // <-- set selected: false
      });
      console.log("Firedata ::: ", this.postsArray);
    });
  }
  deletePost(post:any){
    this.uploadFileToFireStorageService.deleteFileUsingUrl(post.imageUrl);
    this.postService.deletePost(post);
    this.toastr.success('Post deleted successfully!', 'Success');
  }
}
