import {token} from "../DataAccess/getToken";

export function loadStatus(ip){

    let xmlHttp = new XMLHttpRequest();

    xmlHttp.open( 'GET', `http://${ip}/api/device/status`, false); // false for synchronous request
    xmlHttp.setRequestHeader('accept', 'application/json');
    xmlHttp.setRequestHeader('Authorization', `Bearer ${token.accessToken}`);
    xmlHttp.send( null );

    let deviceStatus = JSON.parse(xmlHttp.responseText);
    console.log(deviceStatus);
}


// hier Ende