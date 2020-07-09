import { Component, OnInit } from '@angular/core';
import { VendorService } from 'src/app/services/vendor.service';
import { AppConstants } from 'src/app/shared/AppConstants';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from 'src/app/shared/dialogs/confirmation-dialog/confirmation-dialog.service';
import { VendorModel } from 'src/app/models/IVendorModel';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post.model';
import {VendorUtils} from 'src/app/shared/util/VendorUtils';
import { UploadFileToFireStorageService } from 'src/app/services/upload-file-to-fire-storage.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.scss']
})
export class VendorListComponent implements OnInit {
  public vendorsList: VendorModel[] = [];
  baseUrl = AppConstants.SERVER_BASE_URL;
  selectedAllChkBox: any;
  blogImage=null;
  postsArray: Post[];
  constructor(private vendorService: VendorService, private toastr: ToastrService, private confirmationDialogService: ConfirmationDialogService
    , private postService: PostService,private uploadFileToFireStorageService:UploadFileToFireStorageService) { }

  ngOnInit(): void {
    this.vendorService.getVendorsList().subscribe(data => {
      this.vendorsList = data;
      console.log("", data);
      this.vendorsList.forEach(vendor => {
        vendor.selected = false;
      })
    });
    console.log("test data fetched ::", this.vendorsList);
    // Test firebase data fetch 
    this.postService.getPosts().subscribe(posts => {
     this.postsArray = posts.map(e => {
        // console.log("firedata :: " , e.payload.doc.data());
        const data = e.payload.doc.data();
        let id= e.payload.doc.id;
        return {id, ...(data as Object)} as Post;
      });
      console.log("Firedata ::: ",this.postsArray);
    });
    
  let values=  VendorUtils.makeRandom(5);
    var postPOjo:Post={createdDate:new Date(),description:VendorUtils.makeRandom(50),expiryDate:new Date(),id:VendorUtils.makeRandom(5),imageUrl:"",modifiedDate:new Date(),subTitle:VendorUtils.makeRandom(15),title:VendorUtils.makeRandom(50),detailedDescription:""};
 //   this.postService.createPost(postPOjo);

  }
  findPlan(planId: number) {
    var planName;
    AppConstants.PLANS_ARRAY.forEach(plan => {
      if (plan.id === planId) {
        planName = plan.name;
      }
    });
    return planName;
  }
  findStatus(statusId: number) {
    var statusName;
    AppConstants.VENDOR_STATUS_ARRAY.forEach(status => {
      if (status.id === statusId) {
        statusName = status.name
      }
    });
    return statusName;
  }
  deactivateVendor(vendorModel) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to activate/de-activate vendor?')
      .then((confirmed) => {
        console.log(vendorModel);
        vendorModel.statusId = (vendorModel.statusId == 1) ? 2 : 1;
        this.vendorService.updateVendor(vendorModel).subscribe(data => {
          this.toastr.success('Vendor updated successfully!', 'Success');
        });
      })
      .catch(() => {
        console.log('User dismissed!');
      });
  }
  deleteVendor(vendorModel) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete vendor?')
      .then((confirmed) => {
        this.vendorService.deleteVendor(vendorModel).subscribe(data => {
          this.vendorsList.splice(this.vendorsList.indexOf(vendorModel), 1);
          this.toastr.warning('Vendor deleted successfully!', 'Success');
        });
      })
      .catch(() => {
        console.log('User dismissed!');
      });
  }
  selectAllVendors() {
    this.vendorsList.forEach(vendor => {
      vendor.selected = this.selectedAllChkBox;
    });
  }
  onFileSelected(event){
    this.uploadFileToFireStorageService.uploadFileSelected(event);
  }
  handleFileInput(files: FileList) {
    this.blogImage = files.item(0);
  //  this.uploadFileToFireStorageService.uploadFileToFireStorage(this.blogImage).subscribe(url=>{
  //    console.log(url);
  //  });
  }
}
