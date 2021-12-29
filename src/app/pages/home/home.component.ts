import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Rating } from 'src/app/models/rating';
import { User } from 'src/app/models/user';



//chess-tower\src\assets\libs\Chess.js
//__importDefault(require('moment'));
//import * as Chess from 'chessS.js';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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
  //public game=new Chess(); 
}
