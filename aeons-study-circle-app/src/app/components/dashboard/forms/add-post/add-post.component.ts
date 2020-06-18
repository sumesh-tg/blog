import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { VendorUtils } from 'src/app/shared/util/VendorUtils';
import { PostService } from 'src/app/services/post.service';
import { ToastrService } from 'ngx-toastr';
import { UploadFileToFireStorageService } from 'src/app/services/upload-file-to-fire-storage.service';
@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  public descriptionEditor = {
    editorData: '<p>Edit here</p>'
  };
  public detailedDescriptionEditor = {
    editorData: '<p>Edit here</p>'
  };

  public postModel: Post = {
    createdDate: new Date(), description: "", expiryDate: new Date(),
    id: VendorUtils.makeRandom(8), imageUrl: "", modifiedDate: new Date(), subTitle: "",
    title: "", detailedDescription: ""
  };

  headerImage=null;

  constructor(private postService: PostService, private toastr: ToastrService,private uploadFileToFireStorageService:UploadFileToFireStorageService) { }

  ngOnInit(): void {
  }
  submitAddPostForm() {

    console.log("Testing new editor == :: ",this.postModel)
    this.uploadFileToFireStorageService.uploadFileToFireStorage(this.headerImage).subscribe(url=>{
      console.log(url);
      this.postModel.imageUrl=url;
      this.postService.createPost(this.postModel)
      this.toastr.success('Post created successfully!', 'Success');
    });
  }
 
  handleFileInput(files: FileList) {
    this.headerImage = files.item(0);
  }
}
