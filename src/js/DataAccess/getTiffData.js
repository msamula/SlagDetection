import exifr from 'exifr';
import {token} from "./getToken";
import {TiffData} from "../Models/tiffDataModel";

export function getTiffData(user){
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open( 'GET', `http://${user.ip}/api/images/live`, true); // false for synchronous request
    xmlHttp.setRequestHeader('accept', 'image/tiff');
    xmlHttp.setRequestHeader('Authorization', `Bearer ${token.accessToken}`);
    xmlHttp.responseType = 'blob';

    xmlHttp.onload = async function () {

        let tiff = window.URL.createObjectURL(this.response, {type: 'image/tiff'});
        let tiffData = await exifr.parse(tiff,true)
            .then(output => {
                let result1 = JSON.parse(output['65104']);
                let result2 = JSON.parse(output['65105']);

                return new TiffData(result1.calibParams[0].param.B,result1.calibParams[0].param.R,result1.calibParams[0].param.F,result1.calibParams[0].param.RBFOffset,result2.emissivity);
            })
        console.log(tiffData)
    }
    xmlHttp.send( null );
}