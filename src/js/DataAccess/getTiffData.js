import UTIF from '../Helper/utif';
import {token} from "./getToken";
import {TiffData} from "../Models/tiffDataModel";
import {pixelHandler, pixelToTemp} from "../DataHandler/tiffHandler/pixelValue";
import {job} from "./getJobInfo";
import {drawAOI} from "../DataHandler/drawAOI";

let start, end, sumTime = 0, counter = 0;
let tiffData, areaTempPixel,tiffTagsLoaded = false;

function areaTempPixelValue(tiffData, temp){
    for (let i = 0; i < Infinity; i++) {
        if(temp<pixelToTemp(tiffData,i)){
            return i-1;
        }
    }
}


function handleTiffData(response, user) {
    let decoded = UTIF.decode(response);

    if(!tiffTagsLoaded){
        let result1 = JSON.parse(decoded[0].t65104);
        let result2 = JSON.parse(decoded[0].t65105);

        tiffData = new TiffData(result1.calibParams[0].param.B,result1.calibParams[0].param.R,result1.calibParams[0].param.F,result1.calibParams[0].param.RBFOffset,result2.emissivity);

        //draw AOI
        drawAOI(job[1], decoded[0].t256[0], decoded[0].t257[0]);        //t256 = image-width    t257 = image-height

        //areaTemp
        areaTempPixel= areaTempPixelValue(tiffData, 273+28);            //KELVIN        273+40      //Calilux 1000
        console.log(areaTempPixel);
        console.log(pixelToTemp(tiffData,areaTempPixel));

        tiffTagsLoaded = true;
        console.log('tiff tags loaded');
    }

    UTIF.decodeImages(response, decoded)
    let Img16Bit = decoded[1].data;

    let highestTemp = pixelHandler(tiffData, Img16Bit, decoded[0].width, decoded[0].height, areaTempPixel);

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