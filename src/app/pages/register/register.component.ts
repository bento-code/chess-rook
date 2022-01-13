import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterData } from 'src/app/models/register-data';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  
  public onSubmit=(form:NgForm)=>
  {
    console.log("sumbit!");
    let data=form.value;
    console.log(data);
    this.authService.signUp(this.registerData)
    .then((isRegistered:boolean)=>
    {
      console.log("data:");
      console.log(isRegistered);
      if(isRegistered)
      {
        this.router.navigate(['/', 'app-login']);
      }
      else this.registerData=new RegisterData("","","","","");
    })
    
    //[routerLink]="'/app-home'"
    
  }



  public registerData:RegisterData;

  constructor(private authService:AuthService, private router:Router) 
  { 
    this.registerData=new RegisterData("","","","","");
  }
  ngOnInit(): void {
  }

}
