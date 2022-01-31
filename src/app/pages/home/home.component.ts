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
import { ChallengeService } from 'src/app/shared/challenge.service';
import { GameService } from 'src/app/shared/game.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification.service';



//chess-tower\src\assets\libs\Chess.js
//__importDefault(require('moment'));
//import * as Chess from 'chessS.js';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public challengesReceived:Challenge[]=this.challengesService.challengesReceived;
  public challengesSent:Challenge[]=this.challengesService.challengesSent;

  //User logged
  public user:User;

  //User to challenge in the input field
  public targetUser="";

  //All checkbox selected or not
  public targetAllUsers=false;

  //Options to show in the rating diff selector
  public minRatingsList=[-25,-50,-100, -150, -200, -250, -300, -350, -400, -450, -500];
  public maxRatingsList=[25,50,100, 150, 200, 250, 300, 350, 400, 450, 500];

  //Selected ratings diff
  public minRatingTarget=-25;
  public maxRatingTarget=25;

  
  //Times to show in the display
  public timeControlsStrings=["1+0","3+0","3+2","10+0","15+5","25+10"];
  public timeControls=[new GameTime(0,1,0,0), new GameTime(0,3,0,0), new GameTime(0,3,0,2), new GameTime(0,10,0,0), new GameTime(0,15,0,5), new GameTime(0,25,0,10)]

  //True if mouse over the time control div
  public selected=[false, false, false, false, false, false];

  public tests:string[];

  constructor(private userService: UserService,
              private challengesService: ChallengeService, 
              private gameService: GameService,
              private router:Router,
              private notifyService:NotificationService)//, private socketService: SocketService) 
  { 
    //this.challengesReceived.push(new Challenge(new User(), new User(),0,0,new GameTime(0,10,0,0),"n","received","public"))
    //this.user=new User("BentoCode",new Rating(2001,2100,2134,2200,1800,1973));
    //this.testsSub = this.socketService.tests.subscribe(data => this.tests = data);

    
    this.userService.getUser(localStorage['username'])
    .then((user:User)=>
    {
      console.log(user)
      console.log(user.username)
      this.user=user;

      console.log(this.user)
      console.log(this.user.username)
    })
    
  }


  


  public newChallenge(timeControl:number) 
  {
    console.log(this.challengesReceived);
    let challengeAlreadyExists=this.challengesSent.filter(challenge => challenge.type == "public").length!=0;
    //let challenge=Challenge
    if(this.targetAllUsers)
    {
      console.log("$$$$$$$$$$$$$$$$$$$");
      if(!challengeAlreadyExists)
        this.challengesService.sendChallenge(new Challenge(new User(this.user.username,new Rating(0,0,0,0,0,0)), new User("*", new Rating(this.minRatingTarget, this.maxRatingTarget, this.minRatingTarget, this.maxRatingTarget, this.minRatingTarget, this.maxRatingTarget)), this.minRatingTarget, this.maxRatingTarget,this.timeControls[timeControl],"sent","sent", "public"));
      else
        alert(`Already searching for a game!`);
    }
    else
    {
      this.challengesService.sendChallenge(new Challenge(this.user, new User(this.targetUser, new Rating(1000, 1100, 1200, 1300, 1400, 1500)), 0, 0, this.timeControls[timeControl],"sent" ,"sent", "private"));
    }
    
    

    /*alert(`${this.timeControls[timeControl]}
    ${this.targetAllUsers}`);*/
  }

  public acceptChallenge = (index:number) => 
  {
    console.log("accepting challenge: "+index)
    this.challengesService.acceptChallenge(index);
  }

  public cancelChallenge = (index:number) => 
  {
    console.log("cancelling challenge: "+index)
    this.challengesService.cancelChallenge(index);
  }

 

  ngOnInit(): void 
  {
    //console.log(this.user);
  }


  //public game=new Chess(); 
}
