import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/custom.css';

import {User} from './Models/userModel';
import {getToken} from "./DataAccess/getToken";
import {getImage} from "./DataAccess/getImage";
import {getTiffData} from "./DataAccess/getTiffData";


//login data
let ipAddress = 'localhost:8080';
let clientID = 'irsxApp';
let clientSecret = 'MnrY2L86pEQr53!6';
let username = 'administrator';
let password = 'administrator';

/*let width = 320;
let height = 240;*/


//--- MAIN PART ---
window.addEventListener('DOMContentLoaded', () => {

    //create user
    let user = new User(ipAddress,username,password,clientID,clientSecret);

    //get token
    getToken(user.ip,user.clientID,user.clientSecret,user.username,user.password);

    //get image
    getImage(user);

    //get data from tiff tags
    getTiffData(user);
});
