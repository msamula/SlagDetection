//check if token is expired
import {refreshToken, token} from "../DataAccess/getToken";

let now;
let expireTime;      //export??

export async function checkToken(user){
    now = new Date();
    expireTime = (token.exp*1000 - now)/1000;

    if(expireTime <= 60){
        await refreshToken(user.ip, user.clientID, user.clientSecret, token.refreshToken);
    }
}