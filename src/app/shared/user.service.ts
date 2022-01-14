import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalUser } from '../models/local-user';
import { Rating } from '../models/rating';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private url="https://chess-rook-rest-api.herokuapp.com/user"

  public async getUser(username:string)
  {
    console.log("getting user...");

    let user:User=new User();

    await this.http.get<any>(this.url+"?username="+username).subscribe(
    {
      next: (data) => 
      {
        if(!data.failed)
        {
         
            let recievedUser=data.user;
            console.log(data);
            user.username=recievedUser.username;
  
            user.rating.bulletActualRating=recievedUser.bulletActualRating;
            user.rating.bulletMaxRating=recievedUser.bulletMaxRating;
  
            user.rating.blitzActualRating=recievedUser.blitzActualRating;
            user.rating.blitzMaxRating=recievedUser.blitzMaxRating;
            
            user.rating.rapidActualRating=recievedUser.rapidActualRating;
            user.rating.rapidMaxRating=recievedUser.rapidMaxRating;
        }
      },
      error: (error) => 
      {
        console.error('There was an error!', error);
      }
    })

    return user;
  }

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
         
            let recievedUser=data.user;
            console.log(data);
            user.username=recievedUser.username;
            user.email=recievedUser.email;
            user.name=recievedUser.name;
            user.surname=recievedUser.surname;
  
            user.rating.bulletActualRating=recievedUser.bulletActualRating;
            user.rating.bulletMaxRating=recievedUser.bulletMaxRating;
  
            user.rating.blitzActualRating=recievedUser.blitzActualRating;
            user.rating.blitzMaxRating=recievedUser.blitzMaxRating;
            
            user.rating.rapidActualRating=recievedUser.rapidActualRating;
            user.rating.rapidMaxRating=recievedUser.rapidMaxRating;
        }
      },
      error: (error) => 
      {
        console.error('There was an error!', error);
      }
    })

    console.log(user);

    return user;
  }


}
