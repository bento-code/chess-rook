import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';

import { NgxChessBoardModule } from "ngx-chess-board";
import { HostListener } from "@angular/core";


const Chess:any = require('chess.js');


//import { NgxChessBoardService } from "ngx-chess-board";
import {NgxChessBoardView} from 'ngx-chess-board';
import { LocalUser } from 'src/app/models/local-user';
import { Rating } from 'src/app/models/rating';
import { CaseBlock } from 'typescript';
import { Clock } from 'src/app/models/clock';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']

})
export class GameComponent implements OnInit {

public screenHeight=0;
public screenWidth=0;
public game=new Chess();
public size=0.3*this.screenWidth;
public lightTileColor:string="rgb(234, 233, 210)";
public darkTileColor:string="rgb(75, 115, 153)";
public sourcePointColor:string="rgb(46, 165, 232)";
public destinationPointColor:string="rgb(120, 201, 237)";

public white:LocalUser=new LocalUser("DefaultWhite","","","","",new Rating(1000,1100,1200,1300,1400,1500)); 
public black:LocalUser=new LocalUser("DefaultBlack","","","","",new Rating(1050,1150,1250,1350,1450,1550));
public clock:Clock=new Clock();


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
      this.size=Math.min(0.82*this.screenHeight, 0.5*this.screenWidth);
      //console.log("board: "+this.board);
      /*if(this.board!==undefined)
        this.board.move("d2d4");*/
}



  

  @ViewChild('board', { static: false }) board: NgxChessBoardView;
  
  /*public start = () =>
  {
    console.log("board: "+this.board);
    //this.board=undefined;
    //console.log(board);
  }*/

  public movements:string[][]=[];
  public listeningBoard=true;

  /*ngAfterViewInit() 
  {
    
    this.game.move('d4');
    this.game.move('d5');
    this.game.move('c4');
    this.game.move('e6');
    this.game.move('Nf3');
    this.game.move('c6');
    this.game.move('g3');
    this.game.move('Nf6');
    this.game.move('Bg2');
    this.game.move('Nbd7');
    this.game.move('Qc2');
    this.game.move('Bd6');
    this.game.move('O-O');
    this.game.move('O-O');
   

    let movementList=this.game.history();
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
    }

    console.log(this.movements)
  }*/

  public boardLoad:boolean=false;

  constructor()//private ngxChessBoardService: NgxChessBoardService) 
  {
    this.onResize();
    this.getScreenSize();
    //game.
    console.log(this.size);
    
  }

  boardMoveListener(move:any)
  {
    console.log(move);
    if(this.listeningBoard)
    {
      let parsedMovement=move.pgn.pgn.match(/[\w#|-|+]+$/)
      console.log(parsedMovement);
      this.game.move(parsedMovement);
      this.updateMovements(parsedMovement);
    }
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

  public waitBoardLoading = () =>
  {
    if(this.board===undefined)
    {
      setTimeout(()=>
      {this.waitBoardLoading()},100)
    }
    else
    {
      this.boardLoad=true;
      console.log("loaded!!");

      this.listeningBoard=false;

      for(let movement of this.game.history({ verbose: true }))
      {
        console.log("Movement: "+movement);
        console.log(movement.from+movement.to)
        this.board.move(movement.from+movement.to);
      }

      this.listeningBoard=true;
    }
      
  }

  ngOnInit(): void {

    console.log("Init!!")
     
    this.game.move('d4');
    this.game.move('d5');
    this.game.move('c4');
    this.game.move('e6');
    this.game.move('Nf3');
    this.game.move('c6');
    this.game.move('g3');
    this.game.move('Nf6');
    this.game.move('Bg2');
    this.game.move('Nbd7');
    this.game.move('Qc2');
    this.game.move('Bd6');
    this.game.move('O-O');
    this.game.move('O-O');
   

    let movementList=this.game.history();

    //while(this.board===undefined)
    //{
      this.waitBoardLoading();
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
    }

    console.log(this.movements)
    
  }

}
