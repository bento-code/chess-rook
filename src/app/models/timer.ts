import { Clock } from "./clock";
import { PlayerTime } from "./player-time";

export class Timer 
{
    //white to move or black
    private turn=true;
    //private date=new Date();
    private clock:Clock;
    private whiteInterval:NodeJS.Timeout;
    private blackInterval:NodeJS.Timeout;
    public whiteMsLeft:number;
    public blackMsLeft:number;
    public initialWhiteMs:number;
    public initialBlackMs:number;
    public initialWhiteTimestamp:number;
    public initialBlackTimestamp:number;
    /*private whiteTimeLeft:number;
    private blackTimeLeft:number;*/
    constructor(clock:Clock)
    {
        this.clock=clock;
        this.whiteMsLeft=1000*this.getSecondsOfPlayerTime(clock.whiteTime);
        this.blackMsLeft=1000*this.getSecondsOfPlayerTime(clock.blackTime);
        this.initialWhiteMs=this.whiteMsLeft;
        this.initialBlackMs=this.blackMsLeft;

    }

    private updateWhiteClock()
    {
        this.clock.whiteTime=this.getPlayerTimeFromSeconds(Math.floor(this.whiteMsLeft/1000));
    }
    private updateBlackClock()
    {
        this.clock.blackTime=this.getPlayerTimeFromSeconds(Math.floor(this.blackMsLeft/1000));
    }

    public incrementWhite = () =>
    {
        this.whiteMsLeft=this.whiteMsLeft+this.clock.increment*1000;
        this.updateWhiteClock()
    }

    public incrementBlack = () =>
    {
        this.blackMsLeft=this.blackMsLeft+this.clock.increment*1000;
        this.updateBlackClock()
    }

    private getSecondsOfPlayerTime(playerTime:PlayerTime)
    {
        console.log(playerTime);
        return 3600*playerTime.hours+60*playerTime.minutes+playerTime.seconds
    }
    private getPlayerTimeFromSeconds(seconds:number)
    {
        let restH=seconds%3600;
        let h=(seconds-restH)/3600;
        let restM=restH%60
        let m=(restH-restM)/60;
        let s=restM;

        console.log("seconds: "+seconds)
        console.log("hours: "+h+"mins: "+m+"sec: "+s);
        console.log("rests: restH: "+restH+"restM: "+m);
        return new PlayerTime(h,m,s)
    }
    //timeLeft: number = 60;

    startWhiteTimer() 
    {
      let initDate=new Date()
      this.initialWhiteTimestamp=initDate.getTime();
      this.initialBlackTimestamp=initDate.getTime();

      this.whiteInterval = setInterval(() => 
      {
        let date=new Date()
        if(this.whiteMsLeft > 0) 
        {
          this.whiteMsLeft=this.initialWhiteMs-(date.getTime()-this.initialWhiteTimestamp);
          this.updateWhiteClock();
        } 
        else 
        {
          this.whiteMsLeft = 0;
        }
      },30)
    }

    startBlackTimer() 
    {
      let initDate=new Date();
      this.initialWhiteTimestamp=initDate.getTime();
      this.initialBlackTimestamp=initDate.getTime();

      this.blackInterval = setInterval(() => 
      {
        let date=new Date();
        if(this.blackMsLeft > 0) 
        {
          this.blackMsLeft=this.initialBlackMs-(date.getTime()-this.initialBlackTimestamp);
          this.updateBlackClock();
        } 
        else 
        {
          this.blackMsLeft = 0;
        }
      },30)
    }

  pauseWhiteTimer() 
  {
    this.initialWhiteMs=this.whiteMsLeft;
    clearInterval(this.whiteInterval);
  }
  pauseBlackTimer() 
  {
    this.initialBlackMs=this.blackMsLeft;
    clearInterval(this.blackInterval);
  }

  move()
  {
    if(this.turn)
    {
      this.pauseWhiteTimer();
      this.startBlackTimer();
    }
    else
    {
      this.pauseBlackTimer();
      this.startWhiteTimer();
    }
    this.turn=!this.turn;
  }
}
