import { Challenge } from "./challenge";
import { Clock } from "./clock";
import { Rating } from "./rating";
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

    constructor(whiteUsername:string, blackUsername:string, whiteRating:number, blackRating:number, clock:Clock)
    {
       this.white={username:whiteUsername, rating: whiteRating}; 
       this.black={username:blackUsername, rating: blackRating}; 
       this.clock = clock;

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

    public move(movement:string)
    {
        this.game.move(movement);
        this.updateMovements(movement);
    }

    public pgn()
    {
      return this.game.pgn();
    }


    
}
