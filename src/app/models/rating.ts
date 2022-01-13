export class Rating {
    public bulletActualRating:number;
    public bulletMaxRating:number;
    public blitzActualRating:number;
    public blitzMaxRating:number;
    public rapidActualRating:number;
    public rapidMaxRating:number;
    constructor(bulletActualRating:number=-1, bulletMaxRating:number=-1, blitzActualRating:number=-1, blitzMaxRating:number=-1, rapidActualRating:number=-1, rapidMaxRating:number=-1)
    {
        this.bulletActualRating=bulletActualRating;
        this.bulletMaxRating=bulletMaxRating;
        this.blitzActualRating=blitzActualRating;
        this.blitzMaxRating=blitzMaxRating;
        this.rapidActualRating=rapidActualRating;
        this.rapidMaxRating=rapidMaxRating;
    }
}
