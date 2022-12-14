let canvas, rect, bluePoint, redPoint;
let start = {};

//coordinates for AOI
export let coordinates = [['RectLine',[ 142, 65],[ 308, 65], [ 308, 232], [ 142, 232]]];

// get mouse position
function getMousePos(evt) {
    let width = 672;                                //hard coded !!!!       2*336
    let height = 504;                               //hard coded !!!!       2*252


    let rect = canvas.getBoundingClientRect(),
        scaleX = width / rect.width,
        scaleY = height / rect.height;

    return {
        x: (evt.clientX - rect.left) * scaleX,
        y: (evt.clientY - rect.top) * scaleY
    }
}

// mouse down event
export function mouseDown(e) {
    canvas = document.getElementById('drawAOICanvas');
    rect = document.getElementById("rect");
    bluePoint = document.getElementById('bluePoint');
    redPoint = document.getElementById('redPoint');

    start = getMousePos(e);

    canvas.addEventListener('mousemove', mouseMove);
    canvas.addEventListener('mouseup', mouseUp);
}

//mouse move event
function mouseMove(e) {

    let { x, y } = getMousePos(e);

    let xStart = Math.min(start.x, x);
    let yStart = Math.min(start.y, y);

    let xEnd = Math.max(start.x, x);
    let yEnd = Math.max(start.y, y);

    let width  = Math.abs(x - start.x);
    let height  = Math.abs(y - start.y);

    //hard coded !!!!       /2
    coordinates = [['RectLine',[Number((xStart/2).toFixed(0)), Number((yStart/2).toFixed(0))],[Number((xEnd/2).toFixed(0)), Number((yStart/2).toFixed(0))], [Number((xEnd/2).toFixed(0)), Number((yEnd/2).toFixed(0))], [Number((xStart/2).toFixed(0)), Number((yEnd/2).toFixed(0))]]];

    rect.setAttribute('x', `${xStart}`);
    rect.setAttribute('y', `${yStart}`);
    rect.setAttribute('width', `${width}`);
    rect.setAttribute('height', `${height}`);

    bluePoint.setAttribute('cx', `${start.x}`);
    bluePoint.setAttribute('cy', `${start.y}`);
    redPoint.setAttribute('cx', `${x}`);
    redPoint.setAttribute('cy', `${y}`);
}


//  removeEventListener

function mouseUp(){
    canvas.removeEventListener('mousemove', mouseMove);
    canvas.removeEventListener('mouseup', mouseUp);
}

export function removeMousedown(){
    canvas.removeEventListener('mousedown', mouseDown);
}