import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
// import { Dialog } from 'primereact/dialog';
// import { Button } from 'primereact/button';
import image from '../public/assets/download.png';
// import Avatar from "react-avatar-edit";
import styles from "../styles/Forms.module.scss";


export default function ProfilePicture() {
    const [src, setSrc] = useState(null);
    const [preview, setPreview] = useState(null);


    return (
        <div>
            <img class="inline object-cover w-16 h-16 mr-2 rounded-full" src='public/assets/download.png' alt="Profile image"/> 
        </div>

        // <div className="fields">
        //     <input type="file" name="profilePic"  />
        //     <button onClick= {handleClick}>Upload</button>
        //     <img src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fimg.freepik.com%2Ffree-icon%2Fuser_318-804690.jpg%3Fw%3D2000&imgrefurl=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fdefault-user&tbnid=loGOvOUXQpa-vM&vet=12ahUKEwiiw9P5pNf7AhVogBUDHY_9AdEQMygpegUIARDGAg..i&docid=X0pEsL5m10xz0M&w=512&h=512&q=default%20profile%20picture&ved=2ahUKEwiiw9P5pNf7AhVogBUDHY_9AdEQMygpegUIARDGAg" 
        //     alt="avatar" className={styles.avatar} />

        // </div>
    )
}
