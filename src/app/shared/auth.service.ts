import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
//import { AuthInterceptor } from '../auth-interceptor';
import { RegisterData } from '../models/register-data';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs';

//import { environment } from '@environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService 
{
  //private authInterceptor:AuthInterceptor;
  private urlRegister="https://chess-rook-rest-api.herokuapp.com/signup";
  private urlLogin="https://chess-rook-rest-api.herokuapp.com/signin";

  constructor(private http: HttpClient) 
  {
    //this.authInterceptor = new AuthInterceptor();
  }

  public async signUp(regData: RegisterData)
  {
    console.log("register...");

    let registered=false;

    let data=await this.http.post<any>(this.urlRegister, 
    {
      username:regData.username, 
      password:regData.password,
      email:regData.email,
      name:regData.name,
      surname:regData.surname
    }).toPromise();
    
    if(!data.failed)
    {
      registered=true;
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

