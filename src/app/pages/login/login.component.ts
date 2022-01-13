import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginData } from 'src/app/models/login-data';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit 
{

  public onSubmit=(form:NgForm)=>
  {
    console.log("submit!");
    let data=form.value;
    console.log(data);
    this.authService.login(data.username, data.password)
    .then((logged:boolean)=>
    {
      console.log("logged???????????????????: "+logged);
      if(logged)
        this.router.navigate(['/', 'app-home']);
    })
    
    //[routerLink]="'/app-home'"
    
  }

  public loginData:LoginData;

  constructor(private authService:AuthService, private router:Router) 
  { 
    this.loginData=new LoginData("","");
  }


  ngOnInit(): void {
  }

}
