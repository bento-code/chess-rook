export class GameOverInfo 
{
    constructor(
        private whiteUsername:string="White_Username", 
        private whiteNewRating:number=1010, 
        private whiteVariation:number=10, 
        private blackUsername:string="Black_Username", 
        private blackNewRating:number=990, 
        private blackVariation:number=-10,
        private result:string="1-0",
        private userIsWhite:boolean=true)//result:{"1-0", "0-1", "1/2"}
    {

    }
}
