import React from 'react';
import Tilt from 'react-tilt';
import './logo.css'

const Logo = () =>{
    return(
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 250, width: 250 }} >
                <div className="Tilt-inner"> 👽 </div>
            </Tilt>
        </div>
    );
}

export default Logo;