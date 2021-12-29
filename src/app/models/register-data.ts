export class RegisterData 
{
    public username:string;
    public password:string;
    public email:string;
    public name:string;
    public surname:string;
    constructor(username:string, password:string, email:string, name:string, surname:string)
    {
        this.password=password;
        this.username=username;
        this.email=email;
        this.name=name;
        this.surname=surname;

    }
}
