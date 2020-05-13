import { Component, OnInit } from '@angular/core';
import { VendorModel } from 'src/app/models/IVendorModel';
import { UploadService } from 'src/app/services/upload.service';
import { VendorService } from 'src/app/services/vendor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VendorUtils } from 'src/app/shared/util/VendorUtils';
import { AppConstants } from 'src/app/shared/AppConstants';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.scss']
})
export class AddVendorComponent implements OnInit {

  public vendorModel: VendorModel = {
    name: "", email: "", address: "", domain: "", merchantKey: "", phone: "",
    planId: 0, uniqueKey: "", websiteUrl: "", themeColor: "",logoImg:[],statusId:0,id:0,selected:false
  };
  vendorLogofileToUpload: File = null;

  constructor(private fileUploadService: UploadService, private vendorService: VendorService,private route: ActivatedRoute,
     private router: Router,private toastr: ToastrService) { }

  ngOnInit(): void {
      this.vendorModel.uniqueKey=AppConstants.VENDOR_UNIQE_KEY_PREFIX+VendorUtils.makeRandom(8);
  }
  resetAddVendorForm(){
    this.vendorModel={
      name: "", email: "", address: "", domain: "", merchantKey: "", phone: "",
      planId: 0, uniqueKey: "", websiteUrl: "", themeColor: "",logoImg:[],statusId:0,id:0,selected:false
    };
    this.vendorModel.uniqueKey=AppConstants.VENDOR_UNIQE_KEY_PREFIX+VendorUtils.makeRandom(8);
  }
  submitAddVendorForm() {
    const formData: FormData = new FormData();
    formData.append('files', this.vendorLogofileToUpload, this.vendorModel.uniqueKey+"_logo");
    this.fileUploadService.uploadFile(formData).subscribe(data => {
      this.vendorModel.logoImg=data;
      this.vendorModel.statusId=1;
      this.vendorService.saveVendor(this.vendorModel).subscribe((data) => {
        console.log(data);
        this.toastr.success('Vendor added successfully!', 'Success');
        this.router.navigate(["/dashboard"], { relativeTo: this.route });
      });
    }, error => {
      console.log(error);
    });
  }
  handleFileInput(files: FileList) {
    this.vendorLogofileToUpload = files.item(0);
  }
  getPlansArray(){
    return AppConstants.PLANS_ARRAY;
  }
}
