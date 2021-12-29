import { Time } from "@angular/common";
import { PlayerTime } from "./player-time";

export class Clock 
{
    public increment:number;
    public whiteTime:PlayerTime;
    public blackTime:PlayerTime;
    constructor(whiteTime:PlayerTime=new PlayerTime(), blackTime:PlayerTime=new PlayerTime(),increment:number=0)
    {
        this.blackTime=blackTime;
        this.whiteTime=whiteTime;
        this.increment=increment;
    }
    public whiteTimeToString = ():String =>
    {
        let minutes=this.whiteTime.minutes;
        let seconds=this.whiteTime.seconds;
        return this.timeToString(minutes, seconds);
    }

    public blackTimeToString = ():String =>
    {
        let minutes=this.blackTime.minutes;
        let seconds=this.blackTime.seconds;
        return this.timeToString(minutes, seconds);
    }
    

    public timeToString = (minutes:number, seconds:number):String =>
    {
        let time="";
        if(minutes<10)
        {
            time=time+"0";
        }
        time=time+minutes+":";
        if(seconds<10)
        {
            time=time+"0";
        }
        time=time+seconds;

        return time;
    }
}
