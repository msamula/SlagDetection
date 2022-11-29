let start = {};
let coordinates = [];
let canvas;

function getMousePos(evt) {
    let width = 672;
    let height = 504;


    let rect = canvas.getBoundingClientRect(),
        scaleX = width / rect.width,
        scaleY = height / rect.height;

    return {
        x: (evt.clientX - rect.left) * scaleX,
        y: (evt.clientY - rect.top) * scaleY
    }
}

export function mouseDown(e) {
    canvas = document.getElementById('drawAOICanvas');

    start = getMousePos(e);
    canvas.addEventListener('mousemove', mouseMove);
    canvas.addEventListener('mouseup', ()=>{
        mouseUp(canvas);
    });
}

function mouseMove(e) {

    const rect = document.getElementById("rect");
    const bluePoint = document.getElementById('bluePoint');
    const redPoint = document.getElementById('redPoint');

    let { x, y } = getMousePos(e);

    let xStart = Math.min(start.x, x);
    let yStart = Math.min(start.y, y);

    let width  = Math.abs(x - start.x);
    let height  = Math.abs(y - start.y);

    let xEnd = Math.max(start.x, x);
    let yEnd = Math.max(start.y, y);

    coordinates = [xStart.toFixed(0)/2, yStart.toFixed(0)/2, xEnd.toFixed(0)/2, yEnd.toFixed(0)/2];

    rect.setAttribute('x', `${xStart}`);
    rect.setAttribute('y', `${yStart}`);
    rect.setAttribute('width', `${width}`);
    rect.setAttribute('height', `${height}`);

    bluePoint.setAttribute('cx', `${start.x}`);
    bluePoint.setAttribute('cy', `${start.y}`);

    redPoint.setAttribute('cx', `${x}`);
    redPoint.setAttribute('cy', `${y}`);
}

function mouseUp(){
    console.log(`Koordinaten: ${coordinates}`);

    canvas.removeEventListener('mousemove', mouseMove);
    canvas.removeEventListener('mouseup', mouseUp);
}
