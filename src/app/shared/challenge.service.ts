import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { Challenge } from '../models/challenge';
import { User } from '../models/user';
import { GameTime } from '../models/game-time';
import { Rating } from '../models/rating';
import { Subject } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  public challengesReceived:Challenge[]=[];

  //public challengesReceivedUpdater: Subject<Challenge[]> = new Subject<Challenge[]>();

  public challengesSent:Challenge[]=[];

  public challengesSentUpdater: Subject<Challenge[]> = new Subject<Challenge[]>();

  public usersOnline:User[] = [];

  constructor(private socket:SocketService, private notifyService:NotificationService) 
  { 
    /*this.challengesReceivedUpdater.subscribe((value)=>
    {
      this.challengesReceived=value;
    })*/
    //this.socket=new SocketService();
    this.onChallengesReceivedUpdated();
    this.onChallengesSentUpdated();
    this.onInvalidCredentials();
    this.onInvalidChallenge();
  }
  sendChallenge(challenge: Challenge)
  {
    this.challengesSent.push(challenge);
    console.log("Sending Challenge...");
    this.socket.io.emit("sendChallenge", challenge);
    console.log(challenge);
    this.notifyService.showSuccess("Challenge Created!","",2000)
  }

  acceptChallenge(index:number)//index of challenge in challengesRecieved array
  {
    let challengeId=this.challengesReceived[index].id;
    console.log("Accepting Challenge...");
    this.socket.io.emit("acceptChallenge", challengeId);
    this.notifyService.showSuccess("Challenge Accepted!","",2000)
    console.log(challengeId);
  }

  cancelChallenge(index:number)//index of challenge in challengesRecieved array
  {
    /*let challengeId=this.challengesSent[index].id;*/
    console.log("Canceling Challenge...");
    this.socket.io.emit("cancelChallenge", index);
    console.log(index);
    /*this.socket.io.emit("cancelChallenge", challengeId);
    console.log(challengeId);*/
  }


  onChallengesReceivedUpdated()
  {
    this.socket.io.on("updateChallengesReceived",(challengesReceived) =>
    {
      console.log("challenges received updated!");
      console.log("received: "+challengesReceived.length)
      console.log(challengesReceived);


      console.log("..............................");
      
      while(this.challengesReceived.length>0)
        this.challengesReceived.pop();

      for(let challengeReceived of challengesReceived)
      {
        this.challengesReceived.push
        (
          new Challenge(
            new User
            (
              challengeReceived.senderUser.username, 
              new Rating
              (
                challengeReceived.senderUser.rating.bulletActualRating,
                challengeReceived.senderUser.rating.bulletMaxRating,
                challengeReceived.senderUser.rating.blitzActualRating,
                challengeReceived.senderUser.rating.blitzMaxRating,
                challengeReceived.senderUser.rating.rapidActualRating,
                challengeReceived.senderUser.rating.rapidMaxRating
              )
            ), 
            new User
            (
              challengeReceived.receiverUser.username, 
              new Rating
              (
                challengeReceived.receiverUser.rating.bulletActualRating,
                challengeReceived.receiverUser.rating.bulletMaxRating,
                challengeReceived.receiverUser.rating.blitzActualRating,
                challengeReceived.receiverUser.rating.blitzMaxRating,
                challengeReceived.receiverUser.rating.rapidActualRating,
                challengeReceived.receiverUser.rating.rapidMaxRating
              )
            ), 
            //challengeReceived.receiverUser, 
            challengeReceived.minRatingTarget, 
            challengeReceived.maxRatingTarget, 
            new GameTime
            (
              challengeReceived.time.hours, 
              challengeReceived.time.minutes, 
              challengeReceived.time.seconds, 
              challengeReceived.time.increment
            ), 
            "pending",
            //challengeReceived.origin,
            "received",

            challengeReceived.type,
            challengeReceived.id
          )
        );
        console.log("==============================");
        console.log(this.challengesReceived);
        console.log("==============================");

      }
    })
  }


  onInvalidChallenge()
  {
    this.socket.io.on(("invalidChallenge"), () =>
    {
      console.log("invalid Challenge!");
      alert("invalid Challenge!");
      this.notifyService.showError("challenge all users or type a valid username!","",2000)
    })
  }

 


  onChallengesSentUpdated()
  {
    this.socket.io.on("updateChallengesSent",(challengesSent) =>
    {
      console.log("challenges sent updated!");
      console.log(challengesSent);

      console.log("..............................");
      
      while(this.challengesSent.length>0)
        this.challengesSent.pop();

      for(let challengeSent of challengesSent)
      {
        this.challengesSent.push
        (
          new Challenge(
            new User
            (
              challengeSent.senderUser.username, 
              new Rating
              (
                challengeSent.senderUser.rating.bulletActualRating,
                challengeSent.senderUser.rating.bulletMaxRating,
                challengeSent.senderUser.rating.blitzActualRating,
                challengeSent.senderUser.rating.blitzMaxRating,
                challengeSent.senderUser.rating.rapidActualRating,
                challengeSent.senderUser.rating.rapidMaxRating
              )
            ), 
            new User
            (
              challengeSent.receiverUser.username, 
              new Rating
              (
                challengeSent.receiverUser.rating.bulletActualRating,
                challengeSent.receiverUser.rating.bulletMaxRating,
                challengeSent.receiverUser.rating.blitzActualRating,
                challengeSent.receiverUser.rating.blitzMaxRating,
                challengeSent.receiverUser.rating.rapidActualRating,
                challengeSent.receiverUser.rating.rapidMaxRating
              )
            ), 
            //challengeSent.receiverUser, 
            challengeSent.minRatingTarget, 
            challengeSent.maxRatingTarget, 
            new GameTime
            (
              challengeSent.time.hours, 
              challengeSent.time.minutes, 
              challengeSent.time.seconds, 
              challengeSent.time.increment
            ), 
            challengeSent.status,
            challengeSent.origin,
            challengeSent.type
          )
        );
        console.log(this.challengesSent);

      }
    })
  }




  onUsersUpdated()
  {
    this.socket.io.on("updateUsers",(usersOnline) =>
    {
      this.usersOnline=usersOnline;
    })
  }

  onInvalidCredentials()
  {
    this.socket.io.on("connect_error", (err) => 
    {
        //console.log(err instanceof Error);
        console.log(err.message); // not authorized
    })
  }

}
