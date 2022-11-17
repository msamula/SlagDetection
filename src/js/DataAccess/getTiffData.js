import exifr from 'exifr';
import {token} from "./getToken";
import {TiffData} from "../Models/tiffDataModel";

let start, end, sumTime = 0, counter = 0;

export function getTiffData(user){

    start = new Date();

    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open( 'GET', `http://${user.ip}/api/images/live`, true); // false for synchronous request
    xmlHttp.setRequestHeader('accept', 'image/tiff');
    xmlHttp.setRequestHeader('Authorization', `Bearer ${token.accessToken}`);
    xmlHttp.responseType = 'blob';

    xmlHttp.onload = async function () {

        let tiff = window.URL.createObjectURL(this.response, {type: 'image/tiff'});
        let tiffData = await exifr.parse(tiff,true)
            .then(output => {
                window.URL.revokeObjectURL(tiff);

                let result1 = JSON.parse(output['65104']);
                let result2 = JSON.parse(output['65105']);

                return new TiffData(result1.calibParams[0].param.B,result1.calibParams[0].param.R,result1.calibParams[0].param.F,result1.calibParams[0].param.RBFOffset,result2.emissivity);
            })

        let arrayBuffer = await xmlHttp.response.arrayBuffer();


        //TIME
        end = new Date();
        sumTime += end.getTime()-start.getTime();
        counter++;
        //console.log((sumTime/counter) + ' ms [GET TIFF TAGS]');
        document.getElementById('tiffTime').innerHTML = (1000/(sumTime/counter)).toFixed(3) + ' HZ [GET TIFF TAGS]';

        getTiffData(user);
    }
    xmlHttp.send( null );
}