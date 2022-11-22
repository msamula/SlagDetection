// 8 bit zu 16 bit verschoben und return des pixelwertes
import {job} from "../../DataAccess/getJobInfo";
import {slag, totalSlag, updateChart} from "../../Chart/chart";

let allPixelAboveAreaTemp = 0;
let allPixelAboveTargetTemp = 0;

function calcPixelValue(img, x, y, imgWidth) {
    let rX = x * 2;                                     //erster und zweiter array-eintrag ergeben zusammen den ersten pixel von 16 bit bzw 2 byte
    let rY = (imgWidth * y) * 2;

    let pixel =  [img[rX + rY], img[rX + rY + 1]];     // erster und zweiter array-eintrag

    return pixel[0] | pixel[1] << 8;                   //BitVerschiebung

    /*    The left shift operator (<<) shifts the first operand the specified number of bits to the left.*/
}

export function pixelToTemp(tiffData,pixelValue) {
    return tiffData.B/(Math.log((tiffData.R/(pixelValue-tiffData.RBFOffset))+tiffData.F));
}

export function pixelHandler(tiffData,img, imgWidth, imgHeight, areaTemp, targetTemp){
    let canvas = document.getElementById("imgCanvas");
    canvas.width  = imgWidth;
    canvas.height = imgHeight;
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgba("+255+","+0+","+0+","+1+")";
    ctx.clearRect(0, 0, imgWidth, imgHeight);

    let highestPixelValueAOI = 0;
    let pixelAboveAreaTemp = 0;
    let pixelAboveTargetTemp = 0;

    let X = job[1][0][1][0];
    let xPlusWidth = job[1][0][2][0];
    let Y = job[1][0][1][1];
    let yPlusHeight = job[1][0][3][1];

    for (let y = Y; y < yPlusHeight; y++) {                     //AOI
        for (let x = X; x < xPlusWidth; x++) {

/*     for (let y = 0; y < imgHeight; y++) {                    //komplettes Bild
         for (let x = 0; x < imgWidth; x++) {    //x-Achse*/

            let pixelValue = calcPixelValue(img,x,y,imgWidth);

            if(pixelValue >= areaTemp){

                pixelAboveAreaTemp++;

                if(pixelValue > targetTemp){
                    ctx.fillRect( x, y, 1, 1 );
                    pixelAboveTargetTemp++;
                }

                //EXTRA
                if(pixelValue > highestPixelValueAOI){
                    highestPixelValueAOI = pixelValue;
                }
            }
        }
    }

    allPixelAboveAreaTemp += pixelAboveAreaTemp;
    allPixelAboveTargetTemp += pixelAboveTargetTemp;

    updateChart(slag,'slag',(pixelAboveTargetTemp/pixelAboveAreaTemp)*100);
    updateChart(totalSlag,'total',(allPixelAboveTargetTemp/allPixelAboveAreaTemp)*100);

    //EXTRA
    document.getElementById('counterX').innerHTML = `pixel above area Temp in AOI to pixel of Image: ${pixelAboveAreaTemp}px [${((pixelAboveAreaTemp/(imgWidth*imgHeight))*100).toFixed(3)}%]`;

    let highestTempAOI = pixelToTemp(tiffData, highestPixelValueAOI);

    document.getElementById('highTemp').innerHTML ='highest Temp in AOI ' + (highestTempAOI).toFixed(2) +' Kelvin';
}