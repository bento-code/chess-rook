import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Rating } from 'src/app/models/rating';
import { LocalUser } from 'src/app/models/local-user';
import { Challenge } from 'src/app/models/challenge';
import { User } from 'src/app/models/user';
import { GameTime } from 'src/app/models/game-time';
import {UserService} from 'src/app/shared/user.service';



//chess-tower\src\assets\libs\Chess.js
//__importDefault(require('moment'));
//import * as Chess from 'chessS.js';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public challengesRecieved:Challenge[]=[];
  public challengesSent:Challenge[]=[];
  public user:User;
  public activeUsers:User[]=[];
  public targetUser="";
  public targetAllUsers=false;
  public minRatingTarget=-25;
  public minRatingsList=[-25,-50,-100, -150, -200, -250, -300, -350, -400, -450, -500];
  public maxRatingTarget=25;
  public maxRatingsList=[25,50,100, 150, 200, 250, 300, 350, 400, 450, 500];

  constructor(private userService: UserService) 
  { 

    //this.user=new User("BentoCode",new Rating(2001,2100,2134,2200,1800,1973));

    this.userService.getUser(localStorage['username'])
    .then((user:User)=>
    {
      this.user=user;
    })

    
    this.activeUsers.push(new User("juan35",new Rating(1001,1100,1134,1200,800,973)));
    this.activeUsers.push(new User("juan24",new Rating(1301,1400,1334,1400,1400,1573)));
    this.activeUsers.push(new User("paco23", new Rating(1343, 1450, 1213, 1459, 1034, 1356)));
    this.activeUsers.push(new User("paco24", new Rating(1643, 1750, 1313, 1459, 1134, 1656)));
    this.activeUsers.push(new User("paco25", new Rating(1743, 1850, 1413, 1559, 1234, 1556)));
    this.activeUsers.push(new User("paco26", new Rating(1543, 1650, 1513, 1659, 1334, 1456)));




    this.challengesRecieved.push(new Challenge(this.activeUsers[0], new GameTime(0,10,0,0),"pending", "recieved"));
    this.challengesRecieved.push(new Challenge(this.activeUsers[1], new GameTime(0,3,0,0),"pending", "recieved"));
    this.challengesRecieved.push(new Challenge(this.activeUsers[2], new GameTime(0,1,0,0),"pending", "recieved"));
    this.challengesRecieved.push(new Challenge(this.activeUsers[3], new GameTime(0,3,0,2),"pending", "recieved"));
    this.challengesRecieved.push(new Challenge(this.activeUsers[4], new GameTime(0,10,0,0),"pending", "recieved"));
    this.challengesRecieved.push(new Challenge(this.activeUsers[5], new GameTime(0,3,0,0),"pending", "recieved"));
    this.challengesRecieved.push(new Challenge(this.activeUsers[0], new GameTime(0,1,0,0),"pending", "recieved"));
    this.challengesRecieved.push(new Challenge(this.activeUsers[1], new GameTime(0,10,0,0),"pending", "recieved"));
    this.challengesRecieved.push(new Challenge(this.activeUsers[2], new GameTime(0,5,0,0),"pending", "recieved"));
    this.challengesRecieved.push(new Challenge(this.activeUsers[3], new GameTime(0,15,0,10),"pending", "recieved"));
    this.challengesRecieved.push(new Challenge(this.activeUsers[4], new GameTime(0,1,0,0),"pending", "recieved"));
    this.challengesRecieved.push(new Challenge(this.activeUsers[5], new GameTime(0,3,0,2),"pending", "recieved"));
    this.challengesRecieved.push(new Challenge(this.activeUsers[0], new GameTime(0,10,0,0),"pending", "recieved"));
    this.challengesRecieved.push(new Challenge(this.activeUsers[1], new GameTime(0,3,0,0),"pending", "recieved"));
    this.challengesRecieved.push(new Challenge(this.activeUsers[2], new GameTime(0,1,0,0),"pending", "recieved"));
    this.challengesRecieved.push(new Challenge(this.activeUsers[3], new GameTime(0,3,0,2),"pending", "recieved"));

    this.challengesSent.push(new Challenge(new User("marcos3", new Rating(1343, 1450, 1213, 1459, 1034, 1356)), new GameTime(0,10,0,0),"pending", "sent"));
    this.challengesSent.push(new Challenge(new User("marcos4", new Rating(1643, 1750, 1313, 1459, 1134, 1656)), new GameTime(0,3,0,0),"pending", "sent"));
    this.challengesSent.push(new Challenge(new User("marcos5", new Rating(1743, 1850, 1413, 1559, 1234, 1556)), new GameTime(0,1,0,0),"pending", "sent"));
    this.challengesSent.push(new Challenge(new User("*", new Rating(-1, -1, -150, 200, -1, -1)), new GameTime(0,3,0,2),"searching...", "sent"));

    

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


  //public game=new Chess(); 
}
