import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginData } from 'src/app/models/login-data';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit 
{

  public onSubmit=(form:NgForm)=>
  {
    let data=form.value;
    console.log(data);
  }

  public loginData:LoginData;

  constructor() 
  { 
    this.loginData=new LoginData("","");
  }

  ngOnInit(): void {
  }

}
