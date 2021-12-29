import { Rating } from "./rating";

export class User {
    public username:string;
    public password:string;
    public email:string;
    public name:string;
    public surname:string;
    public rating:Rating;
    

    constructor(username:string, password:string, email:string, name:string, surname:string, rating:Rating)
    {
        this.password=password;
        this.username=username;
        this.email=email;
        this.name=name;
        this.surname=surname;
        this.rating=rating;
    }
}
