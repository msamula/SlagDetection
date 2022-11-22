import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/custom.css';

import {User} from './Models/userModel';
import {getToken} from "./DataAccess/getToken";
import {getImage} from "./DataAccess/getImage";
import {getTiffData} from "./DataAccess/getTiffData";
import {getJobInfo} from "./DataAccess/getJobInfo";
import {createChart} from "./Chart/chart";


//login data
let ipAddress = 'localhost:8080';       /* '192.168.3.20'  'localhost:8080' '169.254.64.2' */
let clientID = 'irsxApp';
let clientSecret = 'MnrY2L86pEQr53!6';
let username = 'administrator';
let password = 'administrator';


//--- MAIN PART ---

//create user
let user = new User(ipAddress,username,password,clientID,clientSecret);

//get token
getToken(user.ip,user.clientID,user.clientSecret,user.username,user.password);

//get Job Info
getJobInfo(user.ip, 'slag');

window.addEventListener('DOMContentLoaded', () => {

    createChart();

    //get image
    getImage(user);

    //get data from tiff tags
    getTiffData(user);
});
