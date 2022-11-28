import {refreshImage} from "./configure";
import {startRect, endRect} from "./drawRectangle";

export function addBtnEvents(){
    let drawAOIBtn = document.getElementById('drawAOIBtn');
    let drawAOICanvas = document.getElementById('drawAOICanvas');

    drawAOIBtn.addEventListener('click', ()=>{

        drawAOICanvas.addEventListener('mousedown', (e)=>{
            startRect(drawAOICanvas,e);
        });

        drawAOICanvas.addEventListener('mouseup', (e)=>{
            endRect(drawAOICanvas,e);
        });
    })

    let areaTempThreshold = document.getElementById('areaTempThreshold');
    let slagTempThreshold = document.getElementById('slagTempThreshold');
    let slagPerc = document.getElementById('slagPerc');
    let totalSlagPerc = document.getElementById('totalSlagPerc');

    areaTempThreshold.value = 1000;
    slagTempThreshold.value = 1300;
    slagPerc.value = 40;
    totalSlagPerc.value = 2;

    areaTempThreshold.addEventListener('input',()=>{
        document.getElementById('areaTempThresholdDisplay').innerHTML = `${areaTempThreshold.value} Kelvin`;
    });
    slagTempThreshold.addEventListener('input',()=>{
        document.getElementById('slagTempThresholdDisplay').innerHTML = `${slagTempThreshold.value} Kelvin`;
    });
    slagPerc.addEventListener('input',()=>{
        document.getElementById('slagPercDisplay').innerHTML = `${slagPerc.value} %`;
    });
    totalSlagPerc.addEventListener('input',()=>{
        document.getElementById('totalSlagPercDisplay').innerHTML = `${totalSlagPerc.value} %`;
    });

    document.getElementById('refreshImage').addEventListener('click', refreshImage);
    document.getElementById('configBtn').addEventListener('click', refreshImage);
}