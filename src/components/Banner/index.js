import React from 'react'

import Logo from '../../assets/logo.png'

const Banner = () =>{
    return(
        <nav className="navbar navbar-expand-lg shadow-sm bg-white col-12 shadow-bottom pt-1 pb-1 sticky-top">
            <a className="navbar-brand" href="#">
                <img className="ml-4" src={Logo} alt=""/>
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse row" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto col-12 d-flex align-items-center">
                <li className="nav-item active">
                    <a className="nav-link" href="#"><h5 className="p-0 m-0 ml-4">Inicio</h5> <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                </li> 
                <li className="ml-auto">
                    <div className="btn-hex-right hex"> 
                        <span>Recursos</span>
                    </div>
                </li>
                <li>
                    <div className="btn-hex-right hex mr-4"> 
                    <span>Juan Vicente</span>
                    </div>
                </li>
                <li>
                    <div className="icon-help position-absolute"></div>
                </li>
                </ul>
            </div>
        </nav>
    );
}
export default Banner;