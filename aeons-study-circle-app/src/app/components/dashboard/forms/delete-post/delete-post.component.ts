import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.scss']
})
export class DeletePostComponent implements OnInit {
  postsArray: Post[];

  constructor(private postService: PostService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(posts => {
      this.postsArray = posts.map(e => {
        const data = e.payload.doc.data();
        let id = e.payload.doc.id;
        return { id, ...(data as Object) } as Post;
      });
      console.log("Firedata ::: ", this.postsArray);
    });
  }
  deletePost(post){
    this.postService.deletePost(post);
    this.toastr.success('Post deleted successfully!', 'Success');
  }
}
