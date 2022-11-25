import {refreshImage} from "./configure";

export function addBtnEvents(){
    document.getElementById('refreshImage').addEventListener('click', refreshImage);
    document.getElementById('configBtn').addEventListener('click', refreshImage);
}