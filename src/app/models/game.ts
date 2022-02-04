import { Challenge } from "./challenge";
import { Clock } from "./clock";
import { Rating } from "./rating";
import { Timer } from "./timer";
import { User } from "./user";

const Chess:any = require('chess.js');

export class Game 
{
    //public challenge:Challenge;
    public game=new Chess();
    public movements:string[][]=[];
    public white={username:"waiting...", rating: 1000}; 
    public black={username:"waiting...", rating: 1000}; 
    public clock:Clock;
    public timer:Timer;

    constructor(whiteUsername:string, blackUsername:string, whiteRating:number, blackRating:number, clock:Clock)
    {
       this.white={username:whiteUsername, rating: whiteRating}; 
       this.black={username:blackUsername, rating: blackRating}; 
       this.clock = clock;
       this.timer=new Timer(this.clock);

    }

    public getMovementList()
    {
      return this.game.history({ verbose: true })
    }

    public updateMovements(movement:string)
    {
      console.log("***************")
      console.log(this.movements);
      console.log("***************")
      let length=this.movements.length;
      let lastTurn;
      if(this.movements.length>0)
        lastTurn=this.movements[length-1].length;
      else
        lastTurn=2
      //console.log("lastTurn: "+lastTurn);
      if(lastTurn==2)
      {
        this.movements.push([movement]);
      }
      else
      {
        this.movements[length-1].push(movement);
      }
    }

    public move(gameState:any)
    {
      this.game.move(gameState.movement);
      this.updateMovements(gameState.movement);
      if(gameState.whiteTime!==undefined&&gameState.blackTime!==undefined)
      {
        this.timer.whiteMsLeft=gameState.whiteTime;
        this.timer.blackMsLeft=gameState.blackTime;
      }
      this.timer.move();
    }

    public pgn()
    {
      return this.game.pgn();
    }


    
}
