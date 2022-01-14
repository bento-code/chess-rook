import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Rating } from 'src/app/models/rating';
import { LocalUser } from 'src/app/models/local-user';
import { Challenge } from 'src/app/models/challenge';
import { User } from 'src/app/models/user';
import { GameTime } from 'src/app/models/game-time';
import {UserService} from 'src/app/shared/user.service';
import { SocketService } from 'src/app/shared/socket.service';
import { Subscription } from 'rxjs';



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

  private testsSub:Subscription;
  public tests:string[];

  constructor(private userService: UserService)//, private socketService: SocketService) 
  { 

    //this.user=new User("BentoCode",new Rating(2001,2100,2134,2200,1800,1973));
    //this.testsSub = this.socketService.tests.subscribe(data => this.tests = data);

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
    
  }


  public timeControlsStrings=["1+0","3+0","3+2","10+0","15+5","25+10"];
  public timeControls=[new GameTime(0,1,0,0), new GameTime(0,3,0,0), new GameTime(0,3,0,2), new GameTime(0,10,0,0), new GameTime(0,15,0,5), new GameTime(0,25,0,10)]
  public selected=[false, false, false, false, false, false]


  public newChallenge(timeControl:number) 
  {
    let challengeAlreadyExists=this.challengesSent.filter(challenge => challenge.user.username === "*").length!=0;
    if(this.targetAllUsers)
    {
      if(!challengeAlreadyExists)
        this.challengesSent.push(new Challenge(new User("*", new Rating(this.minRatingTarget, this.maxRatingTarget, this.minRatingTarget, this.maxRatingTarget, this.minRatingTarget, this.maxRatingTarget)), this.timeControls[timeControl],"searching...", "sent"));
      else
        alert(`Already searching for a game!`);
    }
    else
    {
      this.challengesSent.push(new Challenge(new User(this.targetUser, new Rating(1000, 1100, 1200, 1300, 1400, 1500)), this.timeControls[timeControl],"searching...", "sent"));
    }
    

    /*alert(`${this.timeControls[timeControl]}
    ${this.targetAllUsers}`);*/
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
