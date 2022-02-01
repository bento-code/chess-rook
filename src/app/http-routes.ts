export abstract class HttpRoutes 
{
    //false => localhost routes. true => production routes;
    static readonly production=true;
    
    static readonly REST_API_URL=HttpRoutes.production ? 'https://chess-rook-rest-api.herokuapp.com' : 'http://localhost:3000';
    static readonly USER_URL= HttpRoutes.REST_API_URL + '/user';
    static readonly SIGN_IN_URL = HttpRoutes.REST_API_URL + '/signin'; 
    static readonly SIGN_UP_URL = HttpRoutes.REST_API_URL + '/signup'; 

    static readonly SERVER_URL = HttpRoutes.production ? 'https://chess-rook-server.herokuapp.com' : 'http://localhost:3200'; 

}
