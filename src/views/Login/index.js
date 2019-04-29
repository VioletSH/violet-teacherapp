import React, {Component} from 'react'
import logo from '../../assets/logo-login.png'
import logoResp from '../../assets/logo-login-res.png'

import './Login.css'
class Login extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="row m-0 vh-100 overflow-hidden login">

                <img src={logo} alt="Logo" className="d-none d-lg-block"/>
                <img src={logoResp} alt="Logo" className="d-block d-lg-none mx-auto h-25"/>

                <div className="col-lg-4 px-4 ml-md-n4 d-flex flex-column align-items-center justify-content-center">
                    <h3 >Plataforma de administración</h3>
                    <form action="" className="my-5 w-75 d-flex flex-column position-relative">
                        <input type="text" name="user" id="user" placeholder="Usuario"/>
                        <input type="password" name="pass" id="pass" placeholder="Contraseña"/>
                        <button className="btn btn-violet-primary position-absolute">Iniciar Sesión</button>
                    </form>     
                    <div className="row justify-content-around w-100">
                        <input className="inp-cbx d-none" id="cbx" type="checkbox"/>
                        <label className="cbx" htmlFor="cbx"><span>
                            <svg width="12px" height="10px" viewBox="0 0 12 10">
                                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                            </svg></span><span>Recordarme</span>
                        </label>
                        <a href="#" className="mr-auto ml-auto">¿Olvidó su contraseña?</a>
                    </div>
                    <h5 className="py-5">¿No tienes cuenta? <a href="#">Regístrate</a></h5>
                    <span>Esta información sólo se puede utilizar con</span>
                    <b>fines académicos</b>
                </div>
            </div>
        );
    }
}

export default Login;