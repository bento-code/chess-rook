import { PlayerTime } from "./player-time";

export class GameTime extends PlayerTime
{
    public increment:number;
    
    constructor(hours:number,minutes:number,seconds:number, increment:number)
    {
        super(hours, minutes, seconds);
        this.increment=increment;
    }

    public override toString = ():String =>
    {
        let time=this.minutes+"+";

        if(this.increment>0)
        {
            time=time+this.increment;            
        }

        else
        {
            time=time+this.seconds;
        }

        /*if(this.seconds<10)
        {
            time=time+"0";
        }
        time=time+this.seconds;*/

        return time;
    }

}
