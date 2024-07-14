import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonDetail } from '../../../models/data/common-detail';
import { Product } from '../../../models/data/product';
import { ProductCategory } from '../../../models/data/product-category';
import { ProductDetail } from '../../../models/data/product-detail';
import { NotifyService } from '../../../services/common/notify.service';
import { ProductService } from '../../../services/product.service';
import { apiUrl } from '../../../shared/app-constants';

@Component({
  selector: 'app-bike-part-edit',
  templateUrl: './bike-part-edit.component.html',
  styleUrl: './bike-part-edit.component.css'
})
export class BikePartEditComponent implements OnInit {
  imagePath = apiUrl + '/Images';
  commonDeatils: CommonDetail[] = [];
  filestore: FileList | undefined = undefined;
  fileArray: File[] = [];
  file_list: Array<string> = [];
  isUploading = false;

  product: Product = {};
  productCategories: ProductCategory[] = [];
  detailsProduct: ProductDetail[] = [];
  editForm: FormGroup = new FormGroup({
    productName: new FormControl('', Validators.required),
    price: new FormControl(undefined, Validators.required),
    shortDescription: new FormControl('', Validators.required),
    productCategoryId: new FormControl(undefined, Validators.required),
    productDetails: new FormArray([]),
  });
  imagesForm: FormGroup = new FormGroup({  
    images: new FormControl(undefined),
  });
  constructor(
    private productService: ProductService,
    private notifyService: NotifyService,
    private activatedRoute: ActivatedRoute
  ) {}
  /* 
   Props
   */
  get productCreated(): boolean {
    return this.product.productId != null;
  }

  get f() {
    return this.editForm.controls;
  }
  get details() {
    return this.editForm.controls['productDetails'] as FormArray;
  }
  /*
    Methods
  */
  addDetail(pd?: ProductDetail) {
    if (pd) {
      this.details.push(
        new FormGroup({
          label: new FormControl(pd.label),
          value: new FormControl(pd.value, Validators.required),
        })
      );
    } else {
      this.details.push(
        new FormGroup({
          label: new FormControl(''),
          value: new FormControl('', Validators.required),
        })
      );
    }
  }
  removeDetail(index: number) {
    this.details.removeAt(index);
  }

  removeImage(index: number) {
    this.fileArray.splice(index, 1);
    this.file_list.splice(index, 1);
    let id: number = this.activatedRoute.snapshot.params['id'];
    console.log(id);
    console.log(index);

    this.productService.deletePicture(id,index).subscribe({
      next: (r) => {
      },
      error: (err) => {
        console.log(err.message | err);
      },
    });
  

  }
  handleFileInputChange(event: any): void {
    this.filestore = event.target.files;

    if (this.filestore?.length) {
      const f = this.filestore[0];
      const count =
        this.filestore.length > 1
          ? `(+${this.filestore.length - 1} files)`
          : '';
      this.imagesForm.controls['images'].patchValue(`${f.name}${count}`);
      //this.file_list = [];
      for (let i = 0; i < this.filestore.length; i++) {
        this.file_list.push(this.filestore[i].name);
        this.fileArray.push(this.filestore[i]);
      }
    } else {
      this.imagesForm.controls['images'].patchValue('');
    }
  }
  save() {
    if (this.editForm.invalid) return;
    console.log(this.editForm.value);
    Object.assign(this.product, this.editForm.value);
    console.log(this.product);
    this.productService.put(this.product).subscribe({
      next: (r) => {
        this.notifyService.notify('Data updated', 'DISMISS');
        console.log(r);
        // this.product.productId = r.productId;
        //this.productCreated=true;
      },
      error: (err) => {
        console.log(err.message | err);
      },
    });
  }
  saveImages() {
    if (this.imagesForm.invalid) return;
    this.productService
      .uploadImages(<number>this.product?.productId, this.fileArray)
      .subscribe({
        next: (r) => {
          this.notifyService.notify('Data saved', 'DISMISS');
          console.log(r);
        },
        error: (err) => {
          this.notifyService.notify('Failed to save data', 'DISMISS');
          console.log(err.message | err);
        },
      });
  }
  ngOnInit(): void {
    let id: number = this.activatedRoute.snapshot.params['id'];
    this.productService.getByIdInclude(id).subscribe({
      next: (r) => {
        this.product = r;
        this.product.productDetails = r.productDetails;
        // console.log(this.product);
        this.editForm.patchValue(this.product);

        // console.log(this.editForm.value);
        this.product.productDetails?.forEach((x) => {
          this.addDetail(x);
        });

        this.product.productPictures?.forEach((x) => {
          // console.log(x.picture?.toString());
          if (x) this.file_list.push(x.picture);
        });
      },
      error: (err) => console.log(err.message | err),
    });

    this.productService.getCategoriesOf(2).subscribe({
      next: (r) => {
        this.productCategories = r;
      },
      error: (err) => {
        console.log(err.message | err);
      },
    });

    this.productService.getDetails(id).subscribe({
      next: (r) => {
        // console.log(r);
        this.detailsProduct = r;
      },
      error: (err) => {
        //  console.log(err.message|err);
      },
    });
  }
}

