import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterData } from 'src/app/models/register-data';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  
  public onSubmit=(form:NgForm)=>
  {
    let data=form.value;
    console.log(data);
  }

  public registerData:RegisterData;

  constructor() 
  { 
    this.registerData=new RegisterData("","","","","");
  }
  ngOnInit(): void {
  }

}
