export let coordinates = [];

let start = {};

function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect(),
        scaleX = canvas.width / rect.width,
        scaleY = canvas.height / rect.height;

    return {
        x: (evt.clientX - rect.left) * scaleX,
        y: (evt.clientY - rect.top) * scaleY
    }
}



export function startRect(canvas,e) {
    start = getMousePos(canvas, e);
}

export function endRect(canvas, e) {
    let { x, y } = getMousePos(canvas, e);

    const context = canvas.getContext('2d');

    context.beginPath();
    context.lineWidth = '1';
    context.strokeStyle = 'rgba(61, 168, 245, 0.8)';
    context.fillStyle   = 'rgba(61, 168, 245, 0.2)';

    context.rect(start.x, start.y, x - start.x, y - start.y);
    context.stroke();
    context.fill();

    let xStart = Math.min(start.x, x);
    let yStart = Math.min(start.y, y);

    let xEnd  = Math.max(x , start.x);
    let yEnd = Math.max(y , start.y);

    coordinates = [xStart, yStart, xEnd, yEnd];
    console.log(coordinates);
}

