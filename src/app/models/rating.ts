export class Rating {
    public bulletActualRating:number;
    public bulletMaxRating:number;
    public blitzActualRating:number;
    public blitzMaxRating:number;
    public rapidActualRating:number;
    public rapidMaxRating:number;
    constructor(bulletActualRating:number, bulletMaxRating:number, blitzActualRating:number, blitzMaxRating:number, rapidActualRating:number, rapidMaxRating:number)
    {
        this.bulletActualRating=bulletActualRating;
        this.bulletMaxRating=bulletMaxRating;
        this.blitzActualRating=blitzActualRating;
        this.blitzMaxRating=blitzMaxRating;
        this.rapidActualRating=rapidActualRating;
        this.rapidMaxRating=rapidMaxRating;
    }
}
