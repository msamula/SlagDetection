import {refreshImage} from "./configure";
import {startRect, endRect} from "./drawRectangle";

export let areaMaxTemp = 273+30;          // Umgebungstemperatur    //KELVIN  Calilux      273+30      //Sequenz 1000
export let targetMaxTemp = 273+47;        // Schlacke               //KELVIN  Calilux      273+47      //Sequenz 1300
export let loadTiffTags = false;

let slag = 40;
let totalSlag = 2;

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

    areaTempThreshold.value = areaMaxTemp;
    slagTempThreshold.value = targetMaxTemp;
    slagPerc.value = slag;
    totalSlagPerc.value = totalSlag;

    areaTempThreshold.addEventListener('input',()=>{
        document.getElementById('areaTempThresholdDisplay').innerHTML = `${areaTempThreshold.value} Kelvin`;
        areaMaxTemp = areaTempThreshold.value;
        loadTiffTags === false ? loadTiffTags = true : loadTiffTags = false;
    });
    slagTempThreshold.addEventListener('input',()=>{
        document.getElementById('slagTempThresholdDisplay').innerHTML = `${slagTempThreshold.value} Kelvin`;
        targetMaxTemp = slagTempThreshold.value;
        loadTiffTags === false ? loadTiffTags = true : loadTiffTags = false;
    });
    slagPerc.addEventListener('input',()=>{
        document.getElementById('slagPercDisplay').innerHTML = `${slagPerc.value} %`;
        slag = slagPerc.value;
        loadTiffTags === false ? loadTiffTags = true : loadTiffTags = false;
    });
    totalSlagPerc.addEventListener('input',()=>{
        document.getElementById('totalSlagPercDisplay').innerHTML = `${totalSlagPerc.value} %`;
        totalSlag = totalSlagPerc.value;
        loadTiffTags === false ? loadTiffTags = true : loadTiffTags = false;
    });

    document.getElementById('refreshImage').addEventListener('click', refreshImage);
    document.getElementById('configBtn').addEventListener('click', refreshImage);
}