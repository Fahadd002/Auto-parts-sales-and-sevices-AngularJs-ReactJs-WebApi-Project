import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from '../../../services/common/notify.service';
import { ProductCategory } from '../../../models/data/product-category';
import { ProductCategoryService } from '../../../services/product-category.service';
import { VehicleType } from '../../../models/data/vehicle-type';

@Component({
  selector: 'app-product-category-edit',
  templateUrl: './product-category-edit.component.html',
  styleUrl: './product-category-edit.component.css'
})
export class ProductCategoryEditComponent {
  productCategory:ProductCategory = null!;
  vehicletypes:VehicleType[] = [];

  editForm:FormGroup = new FormGroup({
    productCategoryName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    vehicleTypeId:new FormControl(undefined, Validators.required),

  })
  constructor(
    private productCategoryService:ProductCategoryService,
    private categoryService:ProductCategoryService,
    private notifyService: NotifyService,
    private activatedRoute:ActivatedRoute
    
  ){}
  get f() {
    return this.editForm.controls;
  }
  save(){
    if(this.editForm.invalid) return;
    Object.assign(this.productCategory, this.editForm.value);
    //console.log(this.department);
    this.productCategoryService.put(this.productCategory)
    .subscribe({
      next: r=>{
        this.notifyService.notify("Data updated", "DISMISS")
      },
      error: err=>{
        this.notifyService.notify("Faile to updata", "DISMISS");
        console.log(err.message | err)
      }
    })
  }
  ngOnInit(): void {
    let id:number = this.activatedRoute.snapshot.params['id'];
    this.productCategoryService.getById(id)
    .subscribe({
      next: r=> {
        this.productCategory=r;
        //console.log(this.department);
        this.editForm.patchValue(this.productCategory);
        console.log(this.editForm.value);
      },
      error:err=> console.log(err.message|err)
    });
    this.categoryService.getTypes().subscribe({
      next: (r) => {
        this.vehicletypes = r;
        // this.editForm.reset({});
        // this.editForm.markAsPristine();
        // this.editForm.markAsUntouched();


      },
      error: (err) => {},
    });

  }

}
