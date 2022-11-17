// 8 bit zu 16 bit verschoben und return des pixelwertes
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

export function highestPixelValue(img, imgWidth, imgHeight){
    let result=0;
    let counterX = 0;

    for (let y = 0; y < imgHeight; y++) {
        for (let x = 0; x < imgWidth; x++) {    //x-Achse
            let tmp = calcPixelValue(img,x,y,imgWidth);
            if(tmp > result){
                result = tmp;
            }
            counterX++;
        }
    }
    document.getElementById('counterX').innerHTML = `scanned pixel: ${counterX}px [${((counterX/(imgWidth*imgHeight))*100).toFixed(3)}%]`;

    return result;
}