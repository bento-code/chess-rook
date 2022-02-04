import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';


import { NgxChessBoardModule } from "ngx-chess-board";
import { HostListener } from "@angular/core";

import {NgbModal, ModalDismissReasons, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';


const Chess:any = require('chess.js');


//import { NgxChessBoardService } from "ngx-chess-board";
import {NgxChessBoardView} from 'ngx-chess-board';
import { LocalUser } from 'src/app/models/local-user';
import { Rating } from 'src/app/models/rating';
import { CaseBlock } from 'typescript';
import { Clock } from 'src/app/models/clock';
import { GameService } from 'src/app/shared/game.service';
import { Game } from 'src/app/models/game';
import { GameOverModalComponent } from '../game-over-modal/game-over-modal.component';
import { GameOverInfo } from 'src/app/models/game-over-info';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']

})
export class GameComponent implements OnInit {

public selectedDraw=false;
public selectedResign=false;
public screenHeight=0;
public screenWidth=0;
public game:Game=this.gameService.game;
public size=0.3*this.screenWidth;
public lightTileColor:string="rgb(234, 233, 210)";
public darkTileColor:string="rgb(75, 115, 153)";
public sourcePointColor:string="rgb(46, 165, 232)";
public destinationPointColor:string="rgb(120, 201, 237)";

public movements:string[][]=this.gameService.game.movements!=undefined ? this.gameService.game.movements : [];//this.gameService.game.movements;
public listeningBoard=true;

public white:any=this.gameService.game.white;
public black:any=this.gameService.game.black;
public clock:Clock=this.gameService.game.clock;

public closeResult = '';

//Pieces to show in game board
public piecesLinks=
{
  whiteKingUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Chess_klt60.png",
  whiteQueenUrl:"https://upload.wikimedia.org/wikipedia/commons/4/49/Chess_qlt60.png",
  whiteKnightUrl: "https://upload.wikimedia.org/wikipedia/commons/2/28/Chess_nlt60.png",
  whiteRookUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Chess_rlt60.png",
  whitePawnUrl: "https://upload.wikimedia.org/wikipedia/commons/0/04/Chess_plt60.png",
  whiteBishopUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Chess_blt60.png",
  
  blackKingUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Chess_kdt60.png",
  blackQueenUrl: "https://upload.wikimedia.org/wikipedia/commons/a/af/Chess_qdt60.png",
  blackKnightUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Chess_ndt60.png",
  blackRookUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Chess_rdt60.png",
  blackPawnUrl: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Chess_pdt60.png",
  blackBishopUrl: "https://upload.wikimedia.org/wikipedia/commons/8/81/Chess_bdt60.png"
}

public isBlack=false;
public drawOffered=false;


@HostListener('window:resize', ['$event'])
onResize() 
{
   this.screenHeight = window.innerHeight;
   this.screenWidth = window.innerWidth;
   
}


@HostListener('window:resize', ['$event'])
getScreenSize() {
      this.screenHeight = window.innerHeight;
      this.screenWidth = window.innerWidth;
      console.log(this.screenHeight, this.screenWidth);
      this.size=Math.min(0.83*this.screenHeight, 0.43*this.screenWidth);
      //console.log("board: "+this.board);
      /*if(this.board!==undefined)
        this.board.move("d2d4");*/
}



  

  @ViewChild('board', { static: false }) board: NgxChessBoardView;

  showGameOver(gameOverInfo: GameOverInfo=new GameOverInfo()) {
    const modalRef = this.modalService.open(GameOverModalComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.gameOverInfo=gameOverInfo;
    modalRef.componentInstance.modalRef=modalRef;
  }

  public boardLoad:boolean=false;

  constructor(private gameService:GameService, private modalService: NgbModal, config: NgbModalConfig)//private ngxChessBoardService: NgxChessBoardService) 
  {
    config.backdrop = 'static';
    config.keyboard = false;
    //this.white={username:"waiting...", rating:1000}
    //this.black={username:"waiting...", rating:1000}
    this.onResize();
    this.getScreenSize();
    //game.
    console.log(this.size);
    console.log(this.gameService.game.movements);
    console.log("======================")
    console.log(this.game)
    console.log("======================")
    //this.game.timer.startWhiteTimer()
    
  }

  public offerDraw()
  {
    this.gameService.offerDraw()
  }
  public resign()
  {
    this.gameService.resign()
  }

  public moveBoard(movement:any)
  {
    let toMove=movement.from+movement.to
    if(movement.promotion)
    {
      let promotion=movement.promotion;
      switch(promotion)
      {
        case 'q':toMove=toMove+'1';
          break;
        case 'r':toMove=toMove+'2';
          break;
        case 'b':toMove=toMove+'3';
          break;
        case 'n':toMove=toMove+'4';
      }
    }
    console.log("Movement: "+toMove);
    console.log(toMove)
    this.listeningBoard=false;
    this.board.move(toMove);
    this.listeningBoard=true;
  }

  public onMoveReceived()
  {
    if(this.boardLoad)
    {
      let movementList=this.game.getMovementList();
      console.log(movementList);
      let movement = movementList[movementList.length-1];

      console.log("]]]]]]]]]]]]]]]]]]]]]]]]]]]")
      console.log(movement);
      console.log("]]]]]]]]]]]]]]]]]]]]]]]]]]]")
      
      this.moveBoard(movement);
    }
    else
      console.log("Not available resource yet")
    
  }

  boardMoveListener(movement:any)
  {
    console.log(movement);
    if(this.listeningBoard)
    {
      //extract the last move from board pgn with regex (select last word block including special symbols like check, checkmate, castle...)
      let parsedMovement=movement.pgn.pgn.match(/[\w#|\-|+|=]+$/)
      let sendMovement=parsedMovement[0];
      console.log("parsedMovement:")
      console.log(parsedMovement[0]);
      console.log(sendMovement)
      this.game.move({movement: parsedMovement[0]});
      this.gameService.sendMove(parsedMovement[0]);
    }
  }


  public waitBoardLoading = () =>
  {
    if(this.board===undefined)
    {
      console.log("loading board...")
      setTimeout(()=>
      {this.waitBoardLoading()},100)
    }
    else
    {
      this.boardLoad=true;
      console.log("loaded!!");

      this.listeningBoard=false;

      console.log("a")
      let reverse=this.black['username']==localStorage['username'];
      console.log("b")
      console.log(this.black['username']);
      console.log("c")
      console.log(localStorage['username']);
      if(reverse)
      {
        this.board.reverse();
        this.isBlack=true;
      }

      for(let movement of this.game.getMovementList())
        this.moveBoard(movement);

      this.listeningBoard=true;
    }
      
  }

  ngOnInit(): void {

    console.log("Init!!")

    this.waitBoardLoading();

    this.gameService.moveReceivedEvent().subscribe(lastMove => 
    {
      console.log("Last Move:")
      console.log(lastMove);
      this.onMoveReceived();
    })
     
    /*game.move('d4');

    let movementList=this.game.history();

    //while(this.board===undefined)
    //{
      


      
      
    //}


      

    console.log(movementList)

    for(let i=0; i<movementList.length;i++)
    {
      console.log(movementList[i])
      let n=Math.floor(i/2);
      let j=i%2;
      if(j==0)
      {
        this.movements.push([movementList[i]]);
      }
      else
      {
        this.movements[n].push(movementList[i]);
      }
    }*/

    console.log(this.game.movements)
    
  }

}