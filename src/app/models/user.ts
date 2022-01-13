import { Rating } from "./rating";

export class User
{
    public username:string;
    public rating:Rating;
    constructor(username:string="-1", rating:Rating=new Rating())
    {
        this.username=username;
        this.rating=rating;
    }
}
