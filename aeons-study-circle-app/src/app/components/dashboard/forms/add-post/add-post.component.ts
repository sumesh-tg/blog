import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Post } from 'src/app/models/post.model';
import { VendorUtils } from 'src/app/shared/util/VendorUtils';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { PostService } from 'src/app/services/post.service';
import { ToastrService } from 'ngx-toastr';
import { UploadFileToFireStorageService } from 'src/app/services/upload-file-to-fire-storage.service';
@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  public Editor1 = ClassicEditor;
  public Editor2 = ClassicEditor;
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
    this.uploadFileToFireStorageService.uploadFileToFireStorage(this.headerImage).subscribe(url=>{
      console.log(url);
      this.postModel.imageUrl=url;
      this.postService.createPost(this.postModel)
      this.toastr.success('Post created successfully!', 'Success');
    });
   
  }
  public onChangeDescription({ editor }: ChangeEvent) {
    // const data = editor.getData();
    // this.postModel.description=data;
  }
  public onChangeDetailedDescription({ editor }: ChangeEvent) {
    // const data = editor.getData();
    // this.postModel.detailedDescription=data;
  }
  handleFileInput(files: FileList) {
    this.headerImage = files.item(0);
  }
}
