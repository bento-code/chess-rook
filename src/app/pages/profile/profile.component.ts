import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Rating } from 'src/app/models/rating';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() 
  { 
    this.user=new User("BentoCode","1234","testmail@tm.com","Pablo","Bento",new Rating(2001,2100,2134,2200,1800,1973));
  }

  public onSubmit=(form:NgForm)=>
  {
    alert("Done!")
    let data=form.value;
    console.log(data);
  }

  ngOnInit(): void 
  {
    //console.log(this.user);
  }

  public user:User;
}

