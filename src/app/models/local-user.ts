import { User } from "./user";
import { Rating } from "./rating";

export class LocalUser extends User {
    public password:string;
    public email:string;
    public name:string;
    public surname:string;
    

    constructor(username:string="-1", password:string="-1", email:string="-1", name:string="-1", surname:string="-1", rating:Rating=new Rating())
    {
        super(username, rating);
        this.password=password;
        this.username=username;
        this.email=email;
        this.name=name;
        this.surname=surname;
        this.rating=rating;
    }
}
