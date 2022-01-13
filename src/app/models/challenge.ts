import { GameTime } from "./game-time";
import { User } from "./user";


export class Challenge 
{
    public user:User;
    public time:GameTime;
    public status:string;
    public type:string;
    constructor(user:User, time:GameTime, status:string, type:string)
    {
        this.time=time;
        this.user=user;
        this.status=status;
        this.type=type;
    }

    public usedRatingByTime = ():number =>
    {
        if(!(this.user.rating.bulletActualRating<0||this.user.rating.blitzActualRating<0||this.user.rating.rapidActualRating<0))
        {
            if(this.time.minutes<3)
                return this.user.rating.bulletActualRating;
            else if(this.time.minutes<10)
                return this.user.rating.blitzActualRating;
            else
                return this.user.rating.rapidActualRating;
        }
        else
        {
            return -1;
        }
        
    }

    public searchRangesToString = ():string =>
    {
        if(this.time.minutes<3)
            return String(this.user.rating.bulletActualRating)+"/+"+String(this.user.rating.bulletMaxRating);
        else if(this.time.minutes<10)
            return String(this.user.rating.blitzActualRating)+"/+"+String(this.user.rating.blitzMaxRating);
        else
        return String(this.user.rating.rapidActualRating)+"/+"+String(this.user.rating.rapidMaxRating);
    }



    public usedRatingToString = ():string =>
    {
        let actualRating=this.usedRatingByTime();
        if(actualRating!=-1)
            return String(actualRating);
        else
        {
            return this.searchRangesToString();
        }
    }
}
