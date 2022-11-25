export function refreshImage() {
    let image = document.getElementById('img');
    let canvas = document.getElementById('drawAOICanvas');
    let ctx = canvas.getContext('2d');
    ctx.drawImage(image, 1, 1);
}