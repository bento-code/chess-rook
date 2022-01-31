import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
//import { AuthInterceptor } from '../auth-interceptor';
import { RegisterData } from '../models/register-data';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs';
import { NotificationService } from './notification.service';
import { HttpRoutes } from '../http-routes';

//import { environment } from '@environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService 
{
  //private authInterceptor:AuthInterceptor;
  /*private urlRegister="http://localhost:3000/signup";
  private urlLogin="http://localhost:3000/signin";*/

  private urlRegister=HttpRoutes.SIGN_UP_URL;
  private urlLogin=HttpRoutes.SIGN_IN_URL;


  /*private urlRegister="https://chess-rook-rest-api.herokuapp.com/signup";
  private urlLogin="https://chess-rook-rest-api.herokuapp.com/signin";*/

  constructor(private http: HttpClient, private notifyService:NotificationService) 
  {
    //this.authInterceptor = new AuthInterceptor();
  }

  public async signUp(regData: RegisterData)
  {
    console.log("register...");

    let registered=false;

    this.notifyService.showWarning("","Creating User...!",undefined)

    let data=await this.http.post<any>(this.urlRegister, 
    {
      username:regData.username, 
      password:regData.password,
      email:regData.email,
      name:regData.name,
      surname:regData.surname
    }).toPromise();

    this.notifyService.clear();
    
    if(!data.failed)
    {
      registered=true;
      this.notifyService.showSuccess("","User Created!",2000)
    }
    else
    {
      this.notifyService.showError("","Username already exists!",2000)
    }

    return registered;

  }

  public async login(username:string, password:string )
  {
    console.log("logging...");

    let logged=false;

    let data=await this.http.post<any>(this.urlLogin, {username, password}).toPromise();
    if(data.logged)
    {
      console.log(data);
      this.setSession(data.jwt, username);
      logged=true;
      this.notifyService.showSuccess("","Logged in succesfully!")
    }
    else
    {
      this.notifyService.showError("", "Invalid Credentials!")
    }

    return logged;
  }
      
  private setSession(authResult:any, username:any) {
      //const expiresAt = moment().add(authResult.expiresIn,'second');

      console.log(authResult);

      localStorage.setItem('jwt', authResult);
      localStorage.setItem('username', username);
  }          

  public logout() {
      localStorage.removeItem("jwt");
      localStorage.removeItem("username");
  }

/*public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
}*/

/*isLoggedOut() {
    return !this.isLoggedIn();
}*/

/*getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
} */   


}

