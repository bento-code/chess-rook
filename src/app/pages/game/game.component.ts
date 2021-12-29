import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';

import { NgxChessBoardModule } from "ngx-chess-board";
import { HostListener } from "@angular/core";


const Chess:any = require('chess.js');


//import { NgxChessBoardService } from "ngx-chess-board";
import {NgxChessBoardView} from 'ngx-chess-board';
import { User } from 'src/app/models/user';
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

public white:User=new User("DefaultWhite","","","","",new Rating(1000,1100,1200,1300,1400,1500)); 
public black:User=new User("DefaultBlack","","","","",new Rating(1050,1150,1250,1350,1450,1550));
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
}



  

  @ViewChild('board', { static: false }) board!: NgxChessBoardView;
  
  public start = () =>
  {
    console.log("board: "+this.board);
    //this.board=undefined;
    //console.log(board);
  }

  public movements:string[][]=[];

  constructor()//private ngxChessBoardService: NgxChessBoardService) 
  {
    this.onResize();
    this.getScreenSize();
    //game.
    this.start();
    console.log(this.size);
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
  }

  ngOnInit(): void {
  }

}
