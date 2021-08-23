import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public productlist:any=[];
  public selectedproduct:any={'_id':null,'Id':null,'name':null,'price':null,'created':null}
  public temp: any;
  constructor(private product:ProductService,private toastr:ToastrService){}
     ngOnInit() {
    this.populate();

   }
  populate(){
    const productlist=this.product.getproduct();
    console.log(productlist);
    productlist.subscribe(data=>{
      //console.log(data);
      this.productlist=data;
      console.log(this.productlist);
    });
  }
  onselect(product:any,btn:any){
   // console.log(product);
    this.selectedproduct=product;
    console.log(this.selectedproduct);
    btn.innerHTML="Update"

  }
  onsubmit(product:any,btn:any){
     console.log(product.value);
     const Id=product.value.Id;
     const name=product.value.name;
     const price=product.value.price;
     const created=product.value.created;
     if(btn.innerHTML =='Add'){


     //const created = Date();
     this.product.addproduct(Id,name,price,created)
     .subscribe(data=>{
       this.temp=data;
      console.log(data);
      console.log(this.temp);
      if (this.temp['msg'] == 'success') {
        // alert('One product Has Been Added Successfully.');
        this.toastr.success('One product Has Been Added Successfully!..','done!');
      }
      else {
        //alert('Somting Wrong !');
        this.toastr.error('unable to add','Error')
      }
      this.populate();
     });
    }else if(btn.innerHTML=='Update'){
      console.log('update');
      this.product.updateproduct(this.selectedproduct._id,Id,name,price,created)
       .subscribe(data=>{
     console.log(data);
     console.log(this.temp);
     //alert('update successfully');
     this.toastr.success('update successfully');
     this.populate()
       });
    }
  }

  delproduct(id:any){
    var r=confirm("Do you want to delete this record?");
    if(r){
    console.log(id);
    this.product.deleteproduct(id)
    .subscribe(data => {
    console.log(data);
    console.log(this.temp);
    //alert('delete iteam!');
    this.toastr.success('delete iteam!');
    this.populate();
    });
  }

  }

}
