import {refreshImage} from "./configure";
import {mouseDown, removeMousedown} from './drawRect'

export let areaMaxTemp = 273+30;          // Umgebungstemperatur    //KELVIN  Calilux      273+30      //Sequenz 1000
export let targetMaxTemp = 273+47;        // Schlacke               //KELVIN  Calilux      273+47      //Sequenz 1300
export let loadTiffTags = false;

export let slag = 80;                    //ÄNDERN!!!!!!!!!!!!!!
export let totalSlag = 50;               //ÄNDERN!!!!!!!!!!!!!!

export function addBtnEvents(){

    let drawAoiBtn = document.getElementById('drawAOIBtn');

    drawAoiBtn.addEventListener('click', ()=> {
        drawAoiBtn.disabled = true;
        document.getElementById('drawAoiSvg').style.display = 'initial';
        document.getElementById('drawAOICanvas').addEventListener('mousedown', mouseDown);
    });

    document.getElementById('saveAOIBtn').addEventListener('click',()=>{
        drawAoiBtn.innerHTML = '<img src="./media/rect_30.png" style="max-height: 20px;"> redraw Rectangle';
        drawAoiBtn.disabled = false;
        removeMousedown();
    });


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
        areaMaxTemp = Number(areaTempThreshold.value);
        loadTiffTags === false ? loadTiffTags = true : loadTiffTags = false;
    });
    slagTempThreshold.addEventListener('input',()=>{
        document.getElementById('slagTempThresholdDisplay').innerHTML = `${slagTempThreshold.value} Kelvin`;
        targetMaxTemp = Number(slagTempThreshold.value);
        loadTiffTags === false ? loadTiffTags = true : loadTiffTags = false;
    });
    slagPerc.addEventListener('input',()=>{
        document.getElementById('slagPercDisplay').innerHTML = `${slagPerc.value} %`;
        slag = Number(slagPerc.value);
        loadTiffTags === false ? loadTiffTags = true : loadTiffTags = false;
    });
    totalSlagPerc.addEventListener('input',()=>{
        document.getElementById('totalSlagPercDisplay').innerHTML = `${totalSlagPerc.value} %`;
        totalSlag = Number(totalSlagPerc.value);
        loadTiffTags === false ? loadTiffTags = true : loadTiffTags = false;
    });

    document.getElementById('refreshImage').addEventListener('click', refreshImage);
    document.getElementById('configBtn').addEventListener('click', refreshImage);
}