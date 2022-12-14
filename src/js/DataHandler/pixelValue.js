// 8 bit zu 16 bit verschoben und return des pixelwertes
//import {job} from "../DataAccess/getJobInfo";
import {slagChart, totalSlagChart, updateChart, updateTimeChart} from "../userInterface/chart";
import {loadTiffTags, slag, totalSlag} from "../userInterface/eventListener";
import {coordinates} from "../userInterface/drawRect";

let allPixelAboveAreaTemp = 0;
let allPixelAboveTargetTemp = 0;

let canvas, ctx, canvasData, slagEl, totalSlagEl, alarm, counterX, dateTime, tapTemp, X, Y, xPlusWidth, yPlusHeight;
let elementsLoaded = false;

function getElements(imgWidth, imgHeight){
    canvas = document.getElementById("imgCanvas");
    canvas.width  = imgWidth;
    canvas.height = imgHeight;
    ctx = canvas.getContext("2d", {willReadFrequently: true});

    slagEl = document.getElementById('slag');
    totalSlagEl = document.getElementById('totalSlag');
    alarm = document.getElementById('alarm');
    counterX = document.getElementById('counterX');
    dateTime = document.getElementById('dateTime');
    tapTemp = document.getElementById('tapTemp');

/*    X = job[1][0][1][0];
    xPlusWidth = job[1][0][2][0];
    Y = job[1][0][1][1];
    yPlusHeight = job[1][0][3][1];*/

    X = coordinates[0][1][0];
    xPlusWidth = coordinates[0][2][0];
    Y = coordinates[0][1][1];
    yPlusHeight = coordinates[0][3][1];

    elementsLoaded === false ? elementsLoaded = true : elementsLoaded = false;
}

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

function drawPixel (canvasData, x, y, imgWidth) {
    let index = (x + y * imgWidth) * 4;

    canvasData.data[index]      = 255;
    canvasData.data[index + 1]  =   0;
    canvasData.data[index + 2]  =   0;
    canvasData.data[index + 3]  = 255;
}

export function pixelHandler(tiffData,img, imgWidth, imgHeight, areaTemp, targetTemp){

    if(elementsLoaded === loadTiffTags){
        getElements(imgWidth, imgHeight);
    }

    ctx.clearRect(0, 0, imgWidth, imgHeight);
    canvasData = ctx.getImageData(0, 0, imgWidth, imgHeight);

    let highestPixelValueAOI = 704;                               // PixelValue = 704 -> 0 Kelvin ????
    let pixelAboveAreaTemp = 0;
    let pixelAboveTargetTemp = 0;

    for (let y = Y; y < yPlusHeight; y++) {                     //AOI
        for (let x = X; x < xPlusWidth; x++) {

            let pixelValue = calcPixelValue(img,x,y,imgWidth);

            if(pixelValue >= areaTemp){

                pixelAboveAreaTemp++;
                if(pixelValue > targetTemp){
                    drawPixel(canvasData, x,y, imgWidth);
                    pixelAboveTargetTemp++;
                }

                if(pixelValue > highestPixelValueAOI){
                    highestPixelValueAOI = pixelValue;
                }
            }
        }
    }

    ctx.putImageData(canvasData, 0, 0);

    allPixelAboveAreaTemp += pixelAboveAreaTemp;
    allPixelAboveTargetTemp += pixelAboveTargetTemp;

    //EXTRA----------------------------
    let countPixel = (pixelAboveAreaTemp/(imgWidth*imgHeight))*100;

    if(countPixel<1){
        let date = new Date();

        dateTime.innerHTML = `Date/Time: ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}  ${(date.getHours()<10?'0':'') + date.getHours()}:${(date.getMinutes()<10?'0':'') + date.getMinutes()}   (${(date.getSeconds()<10?'0':'') + date.getSeconds()} sec)`;
        allPixelAboveAreaTemp = 0;
        allPixelAboveTargetTemp = 0;
    }
    //----------------------------------


    let pixelAbovePercentage = ((pixelAboveTargetTemp/pixelAboveAreaTemp)*100).toFixed(1);
    let allPixelAbovePercentage = ((allPixelAboveTargetTemp/allPixelAboveAreaTemp)*100).toFixed(1);

    slagEl.innerHTML        = ( isNaN(pixelAbovePercentage)    ? '0.0' : pixelAbovePercentage) + '%';
    totalSlagEl.innerHTML   = ( isNaN(allPixelAbovePercentage) ? '0.0' : allPixelAbovePercentage) + '%';


    if( allPixelAbovePercentage < totalSlag && pixelAbovePercentage < slag){
        alarm.style.backgroundColor = 'rgba(0,255,0,1)';
    }

    if( allPixelAbovePercentage >= totalSlag || pixelAbovePercentage >= slag){
        alarm.style.backgroundColor = 'rgba(255,0,0,1)';
    }

    updateChart(slagChart,'slag',pixelAbovePercentage);
    updateChart(totalSlagChart,'total',allPixelAbovePercentage);

    updateTimeChart(pixelAbovePercentage);


    /*EXTRA     counterX.innerHTML = `pixel above area Temp in AOI to pixel of Image: ${pixelAboveAreaTemp}px [${countPixel.toFixed(0)}%]`;  */

    let highestTempAOI = (pixelToTemp(tiffData, highestPixelValueAOI)-273.15).toFixed(0);

    tapTemp.innerHTML = 'Tap Temperature:  ' + (highestTempAOI == -273 ? '' : highestTempAOI) + '??C';
}