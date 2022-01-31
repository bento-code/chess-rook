import { LocalUser } from "./local-user";

export class UpdatableUser extends LocalUser
{
    public newPassword:string | undefined;
    constructor(username:string="loading...", password:string="loading...", email:string="loading...", name:string="loading...", surname:string="loading...", newPassword:string="") 
    {
        console.log(username, password, email, name, surname, newPassword);
        super(username, password, email, name, surname);
        if(newPassword=="")
            this.newPassword = undefined;
        else
            this.newPassword = newPassword;
    }
}
