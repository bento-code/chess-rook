export abstract class HttpRoutes 
{
    //false => localhost routes. true => production routes;
    static readonly production=false;
    
    static readonly REST_API_URL=this.production ? 'https://chess-rook-rest-api.herokuapp.com' : 'http://localhost:3000';
    static readonly USER_URL= this.REST_API_URL + '/user';
    static readonly SIGN_IN_URL = this.REST_API_URL + '/signin'; 
    static readonly SIGN_UP_URL = this.REST_API_URL + '/signup'; 

    static readonly SERVER_URL = this.production ? 'https://chess-rook-server.herokuapp.com' : 'http://localhost:3200'; 




}
