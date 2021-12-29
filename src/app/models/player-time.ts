export class PlayerTime 
{
    public hours:number;
    public minutes:number;
    public seconds:number;
    
    constructor(hours:number=0,minutes:number=10,seconds:number=0)
    {
        this.hours=hours;
        this.minutes=minutes;
        this.seconds=seconds;
    }
}
