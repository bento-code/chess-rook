import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { LocalUser } from '../models/local-user';
import { Rating } from '../models/rating';
import { UpdatableUser } from '../models/updatable-user';
import { User } from '../models/user';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private notifyService:NotificationService) { }

  //private url="https://chess-rook-rest-api.herokuapp.com/user"
  private url="http://localhost:3000/user"





  public async getUser(username:string)
  {
    console.log("getting user...");

    let user:User=new User();

    //last value from observable returned by httpclient. Deprecated toObservable()
    let data=await lastValueFrom(this.http.get<any>(this.url+"?username="+username));
    console.log(data);
    if(!data.failed)
    {
        let receivedUser=data.user;
        console.log(data);
        user.username=receivedUser.username;
        user.rating.bulletActualRating=receivedUser.bulletActualRating;
        user.rating.bulletMaxRating=receivedUser.bulletMaxRating;
        user.rating.blitzActualRating=receivedUser.blitzActualRating;
        user.rating.blitzMaxRating=receivedUser.blitzMaxRating;
        
        user.rating.rapidActualRating=receivedUser.rapidActualRating;
        user.rating.rapidMaxRating=receivedUser.rapidMaxRating;
    }
    else
    {
      this.notifyService.showError("", "Invalid Credentials!")
    }

    return user;
  }





  public async getLocalUser(username:string)
  {
    console.log("getting user...");

    let user:LocalUser=new LocalUser();

    //last value from observable returned by httpclient. Deprecated toObservable()
    let data=await lastValueFrom(this.http.get<any>(this.url+"?username="+username));
    console.log(data);
    if(!data.failed)
    {
     
        let receivedUser=data.user;
        console.log(data);
        user.username=receivedUser.username;
        user.email=receivedUser.email;
        user.name=receivedUser.name;
        user.surname=receivedUser.surname;
        user.rating.bulletActualRating=receivedUser.bulletActualRating;
        user.rating.bulletMaxRating=receivedUser.bulletMaxRating;
        user.rating.blitzActualRating=receivedUser.blitzActualRating;
        user.rating.blitzMaxRating=receivedUser.blitzMaxRating;
        
        user.rating.rapidActualRating=receivedUser.rapidActualRating;
        user.rating.rapidMaxRating=receivedUser.rapidMaxRating;
    }
    else
    {
      this.notifyService.showError("", "Invalid Credentials!")
    }

    return user;
  }

  /*public async getUser(username:string)
  {
    console.log("getting user...");

    let user:User=new User();

    await this.http.get<any>(this.url+"?username="+username).subscribe(
    {
      next: (data) => 
      {
        if(!data.failed)
        {
         
            let receivedUser=data.user;
            console.log(data);
            user.username=receivedUser.username;
  
            user.rating.bulletActualRating=receivedUser.bulletActualRating;
            user.rating.bulletMaxRating=receivedUser.bulletMaxRating;
  
            user.rating.blitzActualRating=receivedUser.blitzActualRating;
            user.rating.blitzMaxRating=receivedUser.blitzMaxRating;
            
            user.rating.rapidActualRating=receivedUser.rapidActualRating;
            user.rating.rapidMaxRating=receivedUser.rapidMaxRating;
        }
      },
      error: (error) => 
      {
        console.error('There was an error!', error);
      }
    })

    return user;
  }*/
/*
  public async getLocalUser(username:string)
  {
    console.log("getting user...");

    let user:LocalUser=new LocalUser();

    await this.http.get<any>(this.url+"?username="+username).subscribe(
    {
      next: (data) => 
      {
        if(!data.failed)
        {
         
            let receivedUser=data.user;
            console.log(data);
            user.username=receivedUser.username;
            user.email=receivedUser.email;
            user.name=receivedUser.name;
            user.surname=receivedUser.surname;
  
            user.rating.bulletActualRating=receivedUser.bulletActualRating;
            user.rating.bulletMaxRating=receivedUser.bulletMaxRating;
  
            user.rating.blitzActualRating=receivedUser.blitzActualRating;
            user.rating.blitzMaxRating=receivedUser.blitzMaxRating;
            
            user.rating.rapidActualRating=receivedUser.rapidActualRating;
            user.rating.rapidMaxRating=receivedUser.rapidMaxRating;
        }
      },
      error: (error) => 
      {
        console.error('There was an error!', error);
      }
    })

    console.log(user);

    return user;
  }*/



  public async putUser(user:UpdatableUser)
  {


    console.log("Update...");

    let updated=false;

    this.notifyService.showWarning("","Updating User...!",undefined)

    let data=await this.http.put<any>(this.url, 
    {
      username:user.username, 
      password:user.password,
      newPassword:user.newPassword,
      email:user.email,
      name:user.name,
      surname:user.surname
    }).toPromise();

    this.notifyService.clear();
    
    if(!data.failed)
    {
      updated=true;
      this.notifyService.showSuccess("","User Updated!",2000)
    }
    else
    {
      this.notifyService.showError("","Incorrect password!",2000)
    }

    return updated;




/*
    console.log("Updating user...");

    //let user:User=new User();

    await this.http.put<any>(this.url,user).subscribe(
    {
      next: (data) => 
      {
        if(!data.failed)
        {
         
            let receivedUser=data.user;
            console.log(data);
            user.username=receivedUser.username;
  
            user.rating.bulletActualRating=receivedUser.bulletActualRating;
            user.rating.bulletMaxRating=receivedUser.bulletMaxRating;
  
            user.rating.blitzActualRating=receivedUser.blitzActualRating;
            user.rating.blitzMaxRating=receivedUser.blitzMaxRating;
            
            user.rating.rapidActualRating=receivedUser.rapidActualRating;
            user.rating.rapidMaxRating=receivedUser.rapidMaxRating;
        }
      },
      error: (error) => 
      {
        console.error('There was an error!', error);
      }
    })

    return true;
    */
  }












}
