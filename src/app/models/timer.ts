import { Clock } from "./clock";
import { PlayerTime } from "./player-time";

export class Timer 
{
    private clock:Clock;
    private whiteInterval:NodeJS.Timeout;
    private blackInterval:NodeJS.Timeout;
    private whiteTimeLeft:number;
    private blackTimeLeft:number;
    constructor(clock:Clock)
    {
        this.clock=clock;
        this.whiteTimeLeft=this.getSecondsOfPlayerTime(clock.whiteTime);
        this.blackTimeLeft=this.getSecondsOfPlayerTime(clock.blackTime);
        /*
        this.whiteTimeLeft=3600*clock.whiteTime.hours+60*clock.whiteTime.minutes+clock.whiteTime.seconds
        this.blackTimeLeft=3600*clock.blackTime.hours+60*clock.blackTime.minutes+clock.whiteTime.seconds
        */
    }

    private updateWhiteClock()
    {
        this.clock.whiteTime=this.getPlayerTimeFromSeconds(this.whiteTimeLeft);
    }
    private updateBlackClock()
    {
        this.clock.blackTime=this.getPlayerTimeFromSeconds(this.blackTimeLeft);
    }

    public incrementWhite = () =>
    {
        this.whiteTimeLeft=this.whiteTimeLeft+this.clock.increment;
        this.updateWhiteClock()
    }

    public incrementBlack = () =>
    {
        this.blackTimeLeft=this.blackTimeLeft+this.clock.increment;
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
    this.whiteInterval = setInterval(() => 
    {
    console.log("Time: "+this.whiteTimeLeft)
      if(this.whiteTimeLeft > 0) 
      {
        this.whiteTimeLeft--;
        this.updateWhiteClock();
      } 
      else 
      {
        this.whiteTimeLeft = 0;
      }
    },1000)
  }

  startBlackTimer() {
    this.blackInterval = setInterval(() => 
    {
      if(this.blackTimeLeft > 0) 
      {
        this.blackTimeLeft--;
        this.updateBlackClock();
      } 
      else 
      {
        this.blackTimeLeft = 0;
      }
    },1000)
  }

  pauseWhiteTimer() {
    clearInterval(this.whiteInterval);
  }
  pauseBlackTimer() {
    clearInterval(this.blackInterval);
  }
}
