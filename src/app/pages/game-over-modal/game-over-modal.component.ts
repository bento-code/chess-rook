import { Component, Input, OnInit } from '@angular/core';
import { GameOverInfo } from 'src/app/models/game-over-info';

import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-over-modal',
  templateUrl: './game-over-modal.component.html',
  styleUrls: ['./game-over-modal.component.css']
})
export class GameOverModalComponent implements OnInit {

  @Input() gameOverInfo:any;
  @Input() modalRef:any;

  constructor(private router:Router) 
  { 
    
  }

  public hoverButton=false;

  goHome() 
  {
    console.log("routing...")
    this.router.navigate(['/', 'app-home']);
    this.modalRef.close();
  }

  getPrintableResult()
  {
    return this.gameOverInfo.result!="1/2" ? this.gameOverInfo.result : "1-2 1/2";
  }

  getWinnerText()
  {
    if(this.gameOverInfo.result=="0-1")
      return "Black Wins!"
    else if(this.gameOverInfo.result=="1-0")
      return "White wins!"
    else
      return "Draw!"
    
  }

  getClassByVariation(isWhite:boolean)
  {
    if(isWhite)
    {
      if(this.gameOverInfo.whiteVariation<0)
        return "redText";
      else
        return "greenText";
    }
    else
    {
      if(this.gameOverInfo.blackVariation<0)
        return "redText";
      else
        return "greenText";   
    }
  }

  getPrintableWhiteVariation()
  {
    let variation=this.gameOverInfo.whiteVariation;
    let printable=variation;
    if(variation>0)
      printable="+"+printable;

    return printable;
  }

  getPrintableBlackVariation()
  {
    let variation=this.gameOverInfo.blackVariation;
    let printable=variation;
    if(variation>0)
      printable="+"+printable;

    return printable;
  }

  getClassByResult() 
  {
    if(this.gameOverInfo.userIsWhite)
    {
      if(this.gameOverInfo.result=="1-0")
        return "green"
      else if(this.gameOverInfo.result=="0-1")
        return "red"
      else
        return "yellow"
    }
    else
    {
      if(this.gameOverInfo.result=="0-1")
        return "green"
      else if(this.gameOverInfo.result=="1-0")
        return "red"
      else
        return "yellow"
    }

  }

  ngOnInit(): void {
  }

}
