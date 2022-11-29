//get the camera image

import {token} from "./getToken";
import {checkToken} from "../DataHandler/checkToken";

let start, end, sumTime = 0, counter = 0;

export async function getImage(user)
{
    start = new Date();

    let image = document.getElementById('img');

    //await checkToken(user);

    let response = await fetch(`http://${user.ip}/api/images/live`, {
        headers: {
            'accept': 'image/bmp',
            'Authorization': `Bearer ${token.accessToken}`
        }
    })

    if (response.status === 200) {
        let blob = await response.blob();
        image.src = URL.createObjectURL(blob);

        image.onload = () => {
            URL.revokeObjectURL(image.src);
        }


        //EXTRA TIME
        end = new Date();
        sumTime += end.getTime()-start.getTime();
        counter++;
        document.getElementById('bmpTime').innerHTML = (1000/(sumTime/counter)).toFixed(3) + ' HZ [BMP]';

        if(counter === 200){
            console.log(':-(><');
            counter = 0;
            sumTime = 0;
        }

        //start new request after the previous one is done
        getImage(user);
    }
}