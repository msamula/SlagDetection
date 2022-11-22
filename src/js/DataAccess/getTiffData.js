import UTIF from '../Helper/utif';
import {token} from "./getToken";
import {TiffData} from "../Models/tiffDataModel";
import {pixelHandler, pixelToTemp} from "../DataHandler/pixelValue";
import {job} from "./getJobInfo";
import {drawAOI} from "../userInterface/drawAOI";

let start, end, sumTime = 0, counter = 0;
let tiffData, areaTemp, targetTemp,tiffTagsLoaded = false;

function TempToPixelValue(tiffData, temp){
    for (let i = 704; i < Infinity; i++) {          //Pixelwert von 704 = 0 Kelvin
        if(temp<pixelToTemp(tiffData,i)){
            return i-1;
        }
    }
}


function handleTiffData(response, user) {
    let decoded = UTIF.decode(response);

    if(!tiffTagsLoaded){

        // get tiff tags
        let result1 = JSON.parse(decoded[0].t65104);
        let result2 = JSON.parse(decoded[0].t65105);

        tiffData = new TiffData(result1.calibParams[0].param.B,result1.calibParams[0].param.R,result1.calibParams[0].param.F,result1.calibParams[0].param.RBFOffset,result2.emissivity);

        //draw AOI
        drawAOI(job[1], decoded[0].t256[0], decoded[0].t257[0]);            //t256 = image-width    t257 = image-height

        //areaTemp+targetTemp
        areaTemp = TempToPixelValue(tiffData, 273+30);                 // Umgebungstemperatur    //KELVIN  Calilux      273+46      //Sequenz 1000
        targetTemp = TempToPixelValue(tiffData, 273+47)               // Schlacke               //KELVIN  Calilux      273+47      //Sequenz 1300

        tiffTagsLoaded = true;
        console.log('...data loaded :D-><');
    }

    UTIF.decodeImages(response, decoded)
    let Img16Bit = decoded[1].data;

    pixelHandler(tiffData, Img16Bit, decoded[0].width, decoded[0].height, areaTemp, targetTemp);


    //TIME      EXTRA
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