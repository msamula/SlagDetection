import UTIF from '../Helper/utif';
import {token} from "./getToken";
import {TiffData} from "../Models/tiffDataModel";
import {pixelHandler} from "../DataHandler/tiffHandler/pixelValue";

let start, end, sumTime = 0, counter = 0;
let tiffData, tiffTagsLoaded = false;

function handleTiffData(response, user) {
    let decoded = UTIF.decode(response);

    if(!tiffTagsLoaded){
        let result1 = JSON.parse(decoded[0].t65104);
        let result2 = JSON.parse(decoded[0].t65105);

        tiffData = new TiffData(result1.calibParams[0].param.B,result1.calibParams[0].param.R,result1.calibParams[0].param.F,result1.calibParams[0].param.RBFOffset,result2.emissivity);
        tiffTagsLoaded = true;
        console.log('tiff tags loaded');
    }

    UTIF.decodeImages(response, decoded)
    let Img16Bit = decoded[1].data;

    let highestTemp = pixelHandler(tiffData, Img16Bit, decoded[0].width, decoded[0].height);

    document.getElementById('temp').innerHTML = (highestTemp-273.15).toFixed(2) +' °C';


    //TIME
    end = new Date();
    let time = end.getTime()-start.getTime();
    sumTime += time;
    counter++;
    //console.log((sumTime/counter) + ' ms');
    document.getElementById('tiffTime').innerHTML = (1000/(sumTime/counter)).toFixed(3) + ' HZ [TIFF]';


    getTiffData(user);
}

export function getTiffData(user){

    start = new Date();

    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open( 'GET', `http://${user.ip}/api/images/live`, true); // false for synchronous request
    xmlHttp.setRequestHeader('accept', 'image/tiff');
    xmlHttp.setRequestHeader('Authorization', `Bearer ${token.accessToken}`);
    xmlHttp.responseType = 'arraybuffer';

    xmlHttp.onload = function () {
        handleTiffData(xmlHttp.response, user);
    }

    xmlHttp.send( null );
}