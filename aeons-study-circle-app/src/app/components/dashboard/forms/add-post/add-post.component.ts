// import * as QuillNamespace from 'quill';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { VendorUtils } from 'src/app/shared/util/VendorUtils';
import { PostService } from 'src/app/services/post.service';
import { ToastrService } from 'ngx-toastr';
import { UploadFileToFireStorageService } from 'src/app/services/upload-file-to-fire-storage.service';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


// import { ImageResize } from 'quill-image-resize-module';
// let Quill: any = QuillNamespace;
// Quill.register('modules/imageResize', ImageResize);

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
  host: {
    '[style.display]': '"flex"',
    '[style.flex-direction]': '"column"',
    '[style.overflow]': '"hidden"'
  }
})
export class AddPostComponent implements OnInit {

  // @ViewChild('detailedDescriptionEditor') detailedDescriptionEditor;
  @ViewChild('postContent') private postContent;
  @ViewChild('postForm') public form: NgForm;
  loading = false;
  detailedDescriptionEditorModules = {
    formula: true,
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote'],
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'],                                         // remove formatting button
      ['link', 'image', 'video']                         // link and image, video
    ]
  };

  public postModel: Post = {
    createdDate: new Date(), description: "", expiryDate: null,
    id: VendorUtils.makeRandom(8), imageUrl: "", modifiedDate: new Date(), subTitle: "",
    title: "", detailedDescription: ""
  };

  headerImage = null;

  constructor(private postService: PostService, private toastr: ToastrService, private uploadFileToFireStorageService: UploadFileToFireStorageService,
    private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
  }
  submitAddPostForm() {
    this.loading = true;
    this.uploadFileToFireStorageService.uploadFileToFireStorage(this.headerImage).then(url => {
      this.postModel.imageUrl = "" + url;
      this.postService.createPost(this.postModel)
      this.toastr.success('Post created successfully!', 'Success');
      this.clearForm();
      this.loading = false;
    });
  }

  handleFileInput(files: FileList) {
    this.headerImage = files.item(0);
  }
  showPostPreview() {
    var url = this.router.url.replace("add-post", "preview");
    localStorage.setItem("postModel", JSON.stringify(this.postModel));
    var newWindow = window.open(url, "_blank");
    setTimeout(function () {
      newWindow.close();
    }, 30000);
    // this.open(this.postContent);
  }
  open(content) {
    let options: NgbModalOptions = {
      size: 'lg',
      centered: true,
      backdropClass: 'backdropClass'
    };
    this.modalService.open(content, options);
  }
  clearForm() {
    this.postModel = {
      createdDate: new Date(), description: "", expiryDate: null,
      id: VendorUtils.makeRandom(8), imageUrl: "", modifiedDate: new Date(), subTitle: "",
      title: "", detailedDescription: ""
    };
  }
}
