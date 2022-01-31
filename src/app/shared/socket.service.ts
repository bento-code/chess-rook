import { Injectable } from '@angular/core';
import {io} from 'socket.io-client';
import { HttpRoutes } from '../http-routes';

@Injectable({
  providedIn: 'root'
})
export class SocketService 
{

  io=io(HttpRoutes.SERVER_URL,
  {
    withCredentials: true,
    autoConnect: true,
    query: 
    {
      username: localStorage['username'],
      jwt: localStorage['jwt']
    }
  });
  
  constructor() 
  { 
    console.log("creating socket...");
    //this.io.emit("connect");
    /*class r{constructor(public elo1:number, public elo2:number){};}
    class u{constructor(public msg:string, public id:number, public rating:r){};}
    let obj=new u("haelo saervier", 1, new r(15,30));
    this.io.emit("test",obj);

    this.io.on("testResponse", ()=>{ alert("response!")})*/
  }
}