import React from 'react'

import Logo from '../../assets/logo.png'
import './Banner.css'
const Banner = () =>{
    return(
        <nav className="navbar navbar-expand-lg shadow-sm bg-white sticky-top">
            <a className="navbar-brand">
                <img src={Logo}/>
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse d-flex justify-content-center" id="navbarNavDropdown">
                <ul class="navbar-nav">
                    <li class="nav-item active mx-2 px-1 pt-4 position-relative">
                        <a class="nav-link" href="#">Asignaturas <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item active mx-2 px-1 pt-4 position-relative">
                        <a class="nav-link" href="#">Estudiante <span class="sr-only">(current)</span></a>
                    </li>
                </ul>
            </div>
            <span>Juan Vicente Pradilla Cerón</span>
        </nav>
    );
}
export default Banner;