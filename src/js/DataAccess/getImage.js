//get the camera image

import {token} from "./getToken";
import {checkToken} from "../DataHandler/checkToken";

export async function getImage(user)
{
    let image = document.getElementById('img');

    await checkToken(user);

    let response = await fetch(`http://${user.ip}/api/images/live`, {
        headers: {
            'accept': 'image/bmp',
            'Authorization': `Bearer ${token.accessToken}`
        }
    })

    if (response.status === 200) {
        let blob = await response.blob();
        image.src = URL.createObjectURL(blob);

        // The URL.revokeObjectURL() static method releases an existing object URL which was previously created by calling URL.createObjectURL().
        // Call this method when you've finished using an object URL to let the browser know not to keep the reference to the file any longer.
        image.onload = () => {
            URL.revokeObjectURL(image.src);
        }

        //start new request after the previous one is done
        getImage(user);
    }
}