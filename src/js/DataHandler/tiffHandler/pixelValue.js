// 8 bit zu 16 bit verschoben und return des pixelwertes
function getPixelValue(img, x, y, imgWidth) {
    let rX = x * 2;                                     //erster und zweiter array-eintrag ergeben zusammen den ersten pixel von 16 bit bzw 2 byte
    let rY = (imgWidth * y) * 2;

    let pixel =  [img[rX + rY], img[rX + rY + 1]];     // erster und zweiter array-eintrag

    return pixel[0] | pixel[1] << 8;                   //BitVerschiebung

    /*    The left shift operator (<<) shifts the first operand the specified number of bits to the left.*/
}