import React from 'react'

import Logo from '../../assets/logo.png'

const Banner = () =>{
    return(
        <nav class="navbar navbar-expand-lg shadow-sm bg-white col-12 shadow-bottom pt-1 pb-1 sticky-top">
            <a class="navbar-brand" href="#">
                <img class="ml-4" src={Logo} alt=""/>
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse row" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto col-12 d-flex align-items-center">
                <li class="nav-item active">
                    <a class="nav-link" href="#"><h5 class="p-0 m-0 ml-4">Inicio</h5> <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                </li> 
                <li class="ml-auto">
                    <div class="btn-hex-right hex"> 
                        <span>Recursos</span>
                    </div>
                </li>
                <li>
                    <div class="btn-hex-right hex mr-4"> 
                    <span>Juan Vicente</span>
                    </div>
                </li>
                <li>
                    <div class="icon-help position-absolute"></div>
                </li>
                </ul>
            </div>
        </nav>
    );
}
export default Banner;