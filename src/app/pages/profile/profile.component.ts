import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Rating } from 'src/app/models/rating';
import { LocalUser } from 'src/app/models/local-user';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/models/user';
import { NotificationService } from 'src/app/shared/notification.service';
import { UpdatableUser } from 'src/app/models/updatable-user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  constructor(private userService: UserService, private notifyService:NotificationService) 
  { 
    this.userService.getLocalUser(localStorage['username'])
    .then((user:LocalUser)=>
    {
      //this.user=new LocalUser();
      this.user=user;
      console.log("user:")
      console.log(this.user);
      console.log(this.user.username);
      this.updatableUser=new UpdatableUser(this.user.username, "", this.user.email, this.user.name, this.user.surname, "")
      console.log("updatableUser:")
      console.log(this.updatableUser);
    })
  }

  public onSubmit=(form:NgForm)=>
  {
    console.log("submit!");
    let data=form.value;
    console.log(data);
    this.userService.putUser(this.updatableUser)
    .then((updated:boolean)=>
    {
      console.log("updated?: "+updated);
      if(updated)
        this.notifyService.showSuccess("Data updated!","")
      else
        this.notifyService.showError("Incorrect Password!","");
    })
    
    //[routerLink]="'/app-home'"
    
  }


  ngOnInit(): void 
  {
    //console.log(this.user);
  }

  public user:LocalUser;
  public updatableUser:UpdatableUser;
  //public actualPassword:string="";
  //public newPassword:string="";
}

