import { Injectable } from '@angular/core';
import { timeStamp } from 'console';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Clock } from '../models/clock';
import { Game } from '../models/game';
import { PlayerTime } from '../models/player-time';
import { SocketService } from './socket.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { GameOverInfo } from '../models/game-over-info';
import {NgbModal, ModalDismissReasons, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import { GameOverModalComponent } from '../pages/game-over-modal/game-over-modal.component';

const Chess:any = require('chess.js');

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public defaultGame=new Game("waiting...", "waiting...", 1000, 1000, new Clock(new PlayerTime(0, 10, 0), new PlayerTime(0, 10, 0), 0));
  public game:Game;
  public movements:string[][]=[];
  public movementList=[];


  public lastMoveRecieved = new BehaviorSubject<string>('');

  public moveReceivedEvent()
  {
    return this.lastMoveRecieved.asObservable();
  }

  public challengesReceivedUpdater: Subject<string[][]> = new Subject<string[][]>();

  constructor(private socket:SocketService, private router:Router, private notifyService:NotificationService, private modalService: NgbModal, config: NgbModalConfig) 
  { 
    this.game=this.defaultGame;
    this.onNewGame();
    this.onMoveEvent();
    this.onGameOver();
    this.onOfferedDraw();
  }


  onMoveEvent()
  {
    this.socket.io.on(("receiveMove"), (movement) =>
    {
      console.log("player moved!");
      console.log(movement)
      this.receiveMove(movement);
    })
  }

  onOfferedDraw() 
  {
    this.socket.io.on(("offeredDraw"), () =>
    {
      console.log("draw offer recieved!");
      this.notifyService.showSuccess("draw?","",2000);
    })
  }

  showGameOver(gameOverInfo: GameOverInfo=new GameOverInfo()) {
    const modalRef = this.modalService.open(GameOverModalComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.gameOverInfo=gameOverInfo;
    modalRef.componentInstance.modalRef=modalRef;
  }

  onGameOver()
  {
    this.socket.io.on(("gameOver"), (data:any) =>
    {
      let isWhite= data.whiteUsername==localStorage["username"] ? true : false;
      let gameOverInfo=new GameOverInfo(data.whiteUsername, data.whiteNewRating, data.whiteVariation, data.blackUsername, data.blackNewRating, data.blackVariation, data.result, isWhite);
      console.log("Game Over!");
      console.log(gameOverInfo);
      this.showGameOver(gameOverInfo);
      //this.notifyService.showSuccess(result,"",3000);
    })
  }

  onNewGame()
  {
    this.socket.io.on(("newGame"), (game:any) =>
    {
      this.notifyService.clear();
      this.notifyService.showSuccess("Starting Game...","",2000)
      console.log("game:")
      console.log(game)
      this.game=new Game(game.white, 
                         game.black, 
                         game.whiteRating, 
                         game.blackRating, 
                         new Clock(new PlayerTime(game.clock.hours, game.clock.minutes, game.clock.seconds),
                                   new PlayerTime(game.clock.hours, game.clock.minutes, game.clock.seconds), 
                                   game.clock.increment
                                  )
      );

      console.log("Saved as:")
      console.log(this.game);
      console.log("routing...")
      this.router.navigate(['/', 'app-game'])
    })
    //
  }

  resign() 
  {
    console.log("Resign!");
    this.socket.io.emit("resign");
  }

  offerDraw() 
  {
    console.log("Offering draw!");
    this.socket.io.emit("offerDraw");
    this.notifyService.showSuccess("draw offer sent!","",2000);
  }

  sendMove(movement:string)
  {
    console.log(movement);
    this.socket.io.emit("sendMove", movement);
    console.log("Movement sent!");
  }

  public receiveMove(movement:string)
  {
    console.log("received move:"+movement)
    this.move(movement);
    //let parsedMovement=move.pgn.pgn.match(/[\w#|-|+]+$/)
    this.lastMoveRecieved.next(movement);
  }

  public move(movement:string)
  {
    console.log("Movement: "+movement);
        //this.board.move(movement.from+movement.to);
    this.game.move(movement);
    console.log(this.game.pgn())
    /*for(let movement of this.gameService.game.history({ verbose: true }))
      {
        console.log("Movement: "+movement);
        console.log(movement.from+movement.to)
        this.board.move(movement.from+movement.to);
      }*/
  }

  public updateMovements(movement:string)
  {
    let length=this.movements.length;
    let lastTurn=this.movements[length-1].length;
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
}
