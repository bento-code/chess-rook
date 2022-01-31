import { GameTime } from "./game-time";
import { User } from "./user";


export class Challenge 
{
    public id: string;
    public senderUser:User;
    public receiverUser:User;
    public minRatingTarget:number;
    public maxRatingTarget:number;
    public time:GameTime;
    public status:string;
    public type:string;
    public origin: string;
    constructor(senderUser:User, receiverUser:User, minRatingTarget:number, maxRatingTarget:number, time:GameTime, status:string, origin:string, type:string, id:string="")
    {
        this.id=id;
        this.minRatingTarget=minRatingTarget;
        this.maxRatingTarget=maxRatingTarget;
        this.time=time;
        this.senderUser=senderUser;
        this.receiverUser=receiverUser;
        this.status=status;
        this.origin=origin;
        this.type=type;
    }

    public usedRatingByTime = ():number =>
    {
        console.log("rating");
            if(this.origin=="received")
            {
                if(this.time.minutes<3)
                    return this.senderUser.rating.bulletActualRating;
                else if(this.time.minutes<10)
                    return this.senderUser.rating.blitzActualRating;
                else
                    return this.senderUser.rating.rapidActualRating;
            }
            else
            {
                if(this.time.minutes<3)
                    return this.receiverUser.rating.bulletActualRating;
                else if(this.time.minutes<10)
                    return this.receiverUser.rating.blitzActualRating;
                else
                    return this.receiverUser.rating.rapidActualRating;
            }
        
    }

    public searchRangesToString = ():string =>
    {
        return String(this.minRatingTarget)+"/+"+String(this.maxRatingTarget);
    }



    public usedRatingToString = ():string =>
    {
        if((this.type=="public")&&(this.origin=="sent"))
            return this.searchRangesToString();
        else
            return String(this.usedRatingByTime());
    }
}
