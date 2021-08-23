import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import{Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public temp: any;

  constructor(private userservice:UserService,private toastr:ToastrService,private router:Router) { }

  ngOnInit(): void {
  }
  signup(userData:any, s1:any){
    s1.innerHTML="<img src='./assets/loader.gif'/>";
    this.userservice.adduser(userData.value.t1,userData.value.t2,userData.value.pass1)
    .subscribe(data=>{
      console.log(this.temp);
        this.toastr.success('one user added');
        setTimeout(()=>{
          s1.innerHTML=`<div class='alert alert-success'></div>`
          this.toastr.info ('Done !');
         },2500)

    });

  }
  login(loginData:any,s2:any){
    s2.innerHTML="<img src='./assets/loader.gif'/>";
    console.log(loginData.value);
    let email = loginData.value.uname;
    let pass1 = loginData.value.passw;
    this.userservice.loginUser(email,pass1)
    .subscribe(data=>{
       this.temp=data;
       setTimeout(()=>{
         if(this.temp['message']=='success'){
           this.toastr.success("Login successfull..!");
           this.router.navigate(['/product']);
         }else{
           this.toastr.error(this.temp['message']);
           s2.innerHTML=`<div class='alert alert-danger'>${this.temp['message']}</div>`;
         }
       // console.log(this.temp);

       },2500);
    });

  }

}
