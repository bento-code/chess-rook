import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Rating } from 'src/app/models/rating';
import { LocalUser } from 'src/app/models/local-user';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


    



  constructor(private userService: UserService) 
  { 
    this.userService.getLocalUser(localStorage['username'])
    .then((user:LocalUser)=>
    {
      this.user=user;
    })
    
    
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

  public user:LocalUser;
}

