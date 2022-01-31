import { User } from "./user";
import { Rating } from "./rating";

export class LocalUser extends User {
    public password:string;
    public email:string;
    public name:string;
    public surname:string;
    

    constructor(username:string="loading...", password:string="loading...", email:string="loading...", name:string="loading...", surname:string="loading...", rating:Rating=new Rating())
    {
        super(username, rating);
        /*this.password=password;
        this.username=username;*/
        this.email=email;
        this.name=name;
        this.surname=surname;
        this.rating=rating;
    }
}
